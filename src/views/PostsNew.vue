<template>
  <div class="backing-bars">
  <div class="container primary-content">
    <section>
      <form v-on:submit.prevent="submit()">
          <h1>New Post</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="filter">
            <label for="basic-dropdown">Posting as: </label>
            <select name="basic-dropdown" v-model="artist">
              <option v-for="artist in allArtists" :value="artist">{{artist.name}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Your post:</label> 
            <input type="text" class="form-control" v-model="text">
          </div>
          <input type="submit" class="btn btn-primary" value="Submit">
        </form>
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
      post: {},
      user: {},
      currentUser: {},
      allArtists: [],
      userId: "",
      artistId: "",
      artist: {},
      text: "",
      errors: [],
    };
  },
  created: function() {
    axios
      .get("/api/users/" + localStorage.getItem("userId"))
      .then(response => {
        this.currentUser = response.data;
        console.log(this.currentUser);
        this.allArtists = this.currentUser.artists;
        console.log(this.allArtists);
      })
      .catch(error => {
        this.errors.push(error);
        console.log(error);
      });
  },
  methods: {
    submit: function() {
      this.artistId = this.artist.id;
      console.log(this.artist);
      var params = {
        user_id: this.currentUser.id,
        artist_id: this.artistId,
        text: this.text,
      };
      axios
        .post("api/posts", params)
        .then(response => {
          this.$router.push("/posts");
          console.log(this.post);
        })
        .catch(error => {
          this.errors.push(error);
          console.log(error);
        });
    },
  },
};
</script>