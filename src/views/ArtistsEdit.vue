<template>
  <div class="backing-bars">
    <div class="container primary-content">
    <section>
      <div>
        <form v-on:submit.prevent="submit()">
        <h1>Edit Artist Info:</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label> 
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label>Location:</label> 
          <input type="text" class="form-control" v-model="location">
        </div>
        <div class="form-group">
          <label>Bio:</label> 
          <input type="text" class="form-control" v-model="bio">
        </div>
        <div class="form-group">
          <label>Members:</label> 
          <input type="text" class="form-control" v-model="members">
        </div>
        <div class="form-group">
          <label>Genre:</label> 
          <input type="text" class="form-control" v-model="genre">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
    <br>
    <div>
      <form class="form-group" v-on:submit.prevent="submit()">
        <label for="">Add a new image: </label>
        <input  class="form-control" type="text" v-model="newImageUrl" placeholder="Image Url">
        <br>
        <button class="btn btn-primary" v-on:click="uploadImage()">Upload</button>
      </form>
    </div>
    <br>
    <div>
      <form class="form-group" v-on:submit.prevent="submit()">
        <label for="">Add a new music link: </label>
        <input class="form-control" type="text" v-model="newMusicUrl" placeholder="Spotify or Bandcamp Url">
        <br>
        <button class="btn btn-primary" v-on:click="uploadMusic()">Upload</button>
      </form>
    </div>
    <div v-if="artist.images.length > 0">
      <h3>Need to delete a photo?</h3>
      <button v-if="readyToDelete == false" v-on:click="armForDeletion()" class="btn btn-dark">Enable photos for permanent deletion</button>
      <button v-if="readyToDelete == true" v-on:click="disarmForDeletion()" class="btn btn-dark">Hide photos</button>
      <br>
      <div v-if="readyToDelete == true" v-for="image in artist.images">
        <br>
        <img :src="`${image.url}`" height="200rem">
        <button class="btn btn-dark" v-on:click="deleteImage(image)">Delete</button>
      </div>
    </div>
    </section>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      user: {},
      artist: {},
      currentUser: {},
      name: "",
      bio: "",
      location: "",
      genre: "",
      members: "",
      errors: [],
      newImageUrl: "",
      newMusicUrl: "",
      editedImageUrl: "",
      readyToDelete: false,
    };
  },
  created: function() {
    axios
      .get("/api/users/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.user = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("/api/artists/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.artist = response.data;
        this.name = this.artist.name;
        this.location = this.artist.location;
        this.bio = this.artist.bio;
        this.genre = this.artist.genre;
        this.members = this.artist.members;
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("/api/users/" + localStorage.getItem("userId"))
      .then(response => {
        this.currentUser = response.data;
        console.log(this.currentUser);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        location: this.location,
        bio: this.bio,
        genre: this.genre,
        members: this.members,
      };
      axios
        .patch("/api/artists/" + this.artist.id, params)
        .then(response => {
          this.$router.push("/artists/" + this.artist.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    uploadImage: function() {
      var params = {
        url: this.newImageUrl,
        artist_id: this.artist.id,
      };
      axios
        .post("/api/images", params)
        .then(response => {
          this.$router.push("/artists/" + this.artist.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    uploadMusic: function() {
      var params = {
        url: this.newMusicUrl,
        artist_id: this.artist.id,
      };
      axios
        .post("/api/music-links", params)
        .then(response => {
          this.$router.push("/artists/" + this.artist.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    deleteImage: function(image) {
      axios
        .delete("/axios/" + image.id)
        .then(response => {
          this.$router.push("/artists/" + this.artist.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    armForDeletion: function() {
      this.readyToDelete = true;
    },
    disarmForDeletion: function() {
      this.readyToDelete = false;
    },
  },
};
</script>