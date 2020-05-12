<template>
  <div class="container">
    <section>
      <div>
        <div class="profile-left">
          <h1>{{ user.first_name }} {{ user.last_name}}</h1>
          <img :src="user.profile_picture">
          <div v-if="user.id === currentUser.id">
            <a :href="`/users/${user.id}/edit`">
              <button class="btn btn-primary">Edit info</button>
            </a>
            
          </div>
        </div>
        <div class="profile-right">
          <h2>{{user.first_name}}'s artist pages:</h2>
          <div v-if="user.artists.length === 0">
            <h3>You don't have any linked artists!</h3>
          </div>
          <div v-for="artist in user.artists">
            <h3>{{ artist.name }}</h3>
            <router-link id="user-link" :to="`/artists/${artist.id}`">Go to page</router-link>
          </div>
        </div>
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
  methods: {},
};
</script>