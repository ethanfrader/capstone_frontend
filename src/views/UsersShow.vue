<template>
  <div class="home">
    <div>
      <h1>{{ user.first_name }} {{ user.last_name}}</h1>
      <img :src="user.profile_picture" height=100px>
      <h2>{{user.first_name}}'s artist pages:</h2>
      <div v-for="artist in user.artists">
        <h3>{{ artist.name }}</h3>
        <router-link :to="`/artists/${artist.id}`">Go to page</router-link>
      </div>
    </div>
    <br>
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
  },
  methods: {},
};
</script>