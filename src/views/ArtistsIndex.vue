<template>
  <div class="home">
    <div v-for="artist in artists">
      <h1>{{ artist.name }}</h1>
      <p>{{ artist.bio }}</p>
      <br>
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
    this.artists = this.artists.sort();
  },
  methods: {},
};
</script>