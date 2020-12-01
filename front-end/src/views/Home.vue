<template>
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="profile in profiles" :key="profile.id">
      <h2>Name: {{profile.name}}</h2>
      <p>Age: {{ profile.age }}</p>
      <img :src="profile.path" />
      <p>Preferences: {{profile.preferences}}</p>
      <p>Contact: {{profile.contact}}</p>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     profiles: [],
    }
  },
   created() {
    this.getProfiles();
  },
  methods: {
    async getProfiles() {
      try {
        let response = await axios.get("/api/profiles");
        this.profiles = response.data;
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
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
