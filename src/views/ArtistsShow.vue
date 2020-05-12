<template>
  <div class="container">
    <section>
        <div>
        <h1>{{ artist.name }}</h1>
        <h4>{{artist.location}} -- {{artist.genre}}</h4>
        <div v-if="artist.users.some(user => user.id === currentUser.id)">
          <button class="btn btn-primary">Edit info</button>
        </div>
        <p><strong>About them:</strong> {{ artist.bio }}</p>
        <p><strong>Members:</strong> {{artist.members}}</p>
        <div v-for="image in images">
          <img class="img-fluid" :src="image.url" height=200px>
        </div>
        <br>
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