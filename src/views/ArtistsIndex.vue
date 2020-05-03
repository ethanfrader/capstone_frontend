<template>
  <div class="home">
    <div v-for="artist in artists">
      <h1>{{ artist.name }}</h1>
      <p>{{ artist.location }} -- {{artist.genre}}</p>
      <img :src="artist.images[0].url" height=150px>
      <br>
      <router-link :to="`/artists/${artist.id}`">See more</router-link>
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
      artists: [],
    };
  },
  created: function() {
    axios
      .get("/api/artists")
      .then(response => {
        this.artists = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {},
};
</script>