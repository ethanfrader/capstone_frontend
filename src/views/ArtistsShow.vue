<template>
  <div class="container">
    <section>
        <div>
        <h1 class="heading">{{ artist.name }}</h1>
        <h4>{{artist.location}} -- {{artist.genre}}</h4>
        <div v-if="artist.users.some(user => user.id === currentUser.id)">
          <a :href="`/artists/${artist.id}/edit`">
          <button class="btn btn-primary">Edit info</button>
          </a>
          <a href="">
          <button class="btn btn-primary">Edit images</button>
          </a>
        </div>
        <h4>About them:</h4>
        <p>{{ artist.bio }}</p>
        <h4>Members:</h4>
        <p>{{artist.members}}</p>
        <h4>Music:</h4>
        <div v-for="link in artist.music_links">
          <a :href="`${link.url}`">{{link.url}}</a>
        </div>
        <div v-for="image in images">
          <img class="img-fluid" :src="image.url" height=200px>
        </div>
        <br>
        <h4>Social Media:</h4>
        <div v-for="link in artist.media_links">
          <a :href="`${link.url}`">{{link.url}}</a>
        </div>
      </div>
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
      artist: [],
      images: [],
      currentUser: {},
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
    axios
      .get("/api/users/" + localStorage.userId)
      .then(response => {
        this.currentUser = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {},
};
</script>