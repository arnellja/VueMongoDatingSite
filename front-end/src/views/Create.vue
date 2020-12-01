<template>
<div>
<h1>Create Your Profile!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Enter Your Information!</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
	<input v-model="age" placeholder="Age">
	<input v-model="preferences" placeholder="Preferences?">
	<input v-model="contact" placeholder="Best contact method?">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addProfile">
        <h2>{{addProfile.name}}</h2>
	<h3>{{ addProfile.preferences }}</h3>
        <img :src="addProfile.path" />
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Profile</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findName" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectProfiles(s)">{{s.name}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findProfile">
        <input v-model="findProfile.age">
	<input v-model="findProfile.preferences">
	<input v-model="findProfile.contact">
        <p></p>
        <img :src="findProfile.path" />
      </div>
      <div class="actions" v-if="findProfile">
        <button @click="deleteProfile(findProfile)">Delete</button>
	<button @click="editProfile(findProfile)">Edit</button>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Create',
  data() {
    return {
      name: "",
      age: "",
      preferences: "",
      contact: "",
      file: null,
      addProfile: null,
      profiles: [],
      findName: "",
      findProfile: null,
    }
  },
  created(){
    this.getProfiles();
  },
  computed: {
    suggestions() {
      let profiles = this.profiles.filter(profile => profile.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return profiles.sort((a, b) => a.Name > b.Name);
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/profiles', {
          name: this.name,
	  age: this.age,
	  preferences: this.preferences,
	  contact: this.contact,
          path: r1.data.path
        });
	console.log(r2);
        this.addProfile = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProfiles() {
      try {
        let response = await axios.get("/api/profiles");
        this.profiles = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectProfiles(profile) {
      this.findName = "";
      this.findProfile = profile;
    },
    async deleteProfile(profile) {
      try {
        await axios.delete("/api/profiles/" + profile._id);
        this.findProfile = null;
        this.getProfiles();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editProfile(profile) {
      try {
        await axios.put("/api/profiles/" + profile._id, {
	  age: this.findProfile.age,
	  preferences: this.findProfile.preferences,
	  contact: this.findProfile.contact,
        });
        this.findProfile = null;
        this.getProfiles();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>


<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: green;
  color: white;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
