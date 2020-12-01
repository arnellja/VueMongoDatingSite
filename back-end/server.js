
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/love', {
  useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const profileSchema = new mongoose.Schema({
  name: String,
  age: String,
  preferences: String,
  contact: String,
  path: String,
});

// Create a model for items in the museum.
const Profile = mongoose.model('Profile', profileSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/profiles', async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    age: req.body.age,
    preferences: req.body.preferences,
    contact: req.body.contact,
    path: req.body.path,
  });
  try {
    await profile.save();
    res.send(profile);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/profiles/:id', async (req, res) => {
  try {
    await Profile.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/profiles/:id', async (req, res) => {
  try {
    profile = await Profile.findOne({
      _id: req.params.id
    });
    profile.age = req.body.age;
    profile.preferences = req.body.preferences;
    profile.contact = req.body.contact;
    await profile.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

});

app.get('/api/profiles', async (req, res) => {
  try {
    let profiles = await Profile.find();
    res.send(profiles);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
