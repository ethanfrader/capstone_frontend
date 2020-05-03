<template>
  <div class="home">
    <div>
      <h1>{{ artist.name }}</h1>
      <h4>{{artist.location}} -- {{artist.genre}}</h4>
      <p><strong>About them:</strong> {{ artist.bio }}</p>
      <p><strong>Members:</strong> {{artist.members}}</p>
      <div v-for="image in images">
        <img :src="image.url" height=200px>
      </div>
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
      artist: [],
      images: [],
    };
  },
  created: function() {
    axios
      .get("/api/artists/" + this.$route.params.id)
      .then(response => {
        this.artist = response.data;
        this.images = this.artist.images;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {},
};
</script>