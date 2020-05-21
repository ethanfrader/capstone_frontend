<template>
  <div class="backing-bars">
  <div class="container primary-content">
    <section>
      <div>
        <form v-on:submit.prevent="submit()">
        <h1>Edit your profile:</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>First name:</label> 
          <input type="text" class="form-control" v-model="firstName">
        </div>
        <div class="form-group">
          <label>Last name:</label> 
          <input type="text" class="form-control" v-model="lastName">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Profile picture url:</label>
          <input type="text" class="form-control" v-model="profilePicture">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
    <br>
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
      currentUser: {},
      firstName: "",
      lastName: "",
      email: "",
      profilePicture: "",
    };
  },
  created: function() {
    axios
      .get("/api/users/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.user = response.data;
        this.firstName = this.user.first_name;
        this.lastName = this.user.last_name;
        this.email = this.user.email;
        this.profilePicture = this.user.profile_picture;
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
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        profile_picture: this.profilePicture,
      };
      axios
        .patch("/api/users/" + this.user.id, params)
        .then(response => {
          this.$router.push("/users/" + this.user.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>