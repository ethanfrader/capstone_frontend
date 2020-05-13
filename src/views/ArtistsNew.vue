<template>
  <div class="container">
    <section>
      <div>
        <form v-on:submit.prevent="submit()">
        <h1>New Artist:</h1>
        <a href="/artists-join">(Already a part of an existing group?)</a>
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
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
    <br>
    </section>
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
      currentUser: {},
      name: "",
      location: "",
      bio: "",
      members: "",
      genre: "",
      email: "",
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
        name: this.Name,
        bio: this.bio,
        location: this.location,
        members: this.members,
        genre: this.genre,
        email: this.email,
      };
      axios
        .post("/api/artists", params)
        .then(response => {
          this.$router.push("/artists/" + this.user.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>