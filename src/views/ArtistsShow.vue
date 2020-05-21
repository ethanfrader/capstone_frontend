<template>
  <div class="backing-bars">
  <div class="container primary-content">
    <section>
      <div>
        <div class="artist-info">
          <h1 class="heading">{{ artist.name }}</h1>
          <h4>{{artist.location}} -- {{artist.genre}}</h4>

          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <button v-if="readyToSend == false" v-on:click="openMessenger()" class="btn btn-dark">Send a message</button>
          <button v-if="readyToSend == true" v-on:click="openMessenger()" class="btn btn-dark">Cancel</button>
          <form v-if="readyToSend == true" class="form-group" action="v-on:submit.prevent=submit()">
            <input class="form-control" type="text" placeholder="New message" v-model="messageText">
            <div class="filter">
              <label for="basic-dropdown">Sending as: </label>
                <select class="" name="basic-dropdown" v-model="myArtist">
                  <option v-for="artist in currentUser.artists" :value="artist">
                    {{ artist.name }}
                  </option>
                </select>
            </div>
            <button class="btn btn-primary" v-on:click="sendMessage()">Send</button>
          </form>

          <div v-if="artist.users.some(user => user.id === currentUser.id)">
            <a :href="`/artists/${artist.id}/edit`">
            <button class="btn btn-primary">Edit info</button>
            </a>
          </div>
          
          <h4>About them:</h4>
          <p>{{ artist.bio }}</p>
          <h4>Members:</h4>
          <p>{{artist.members}}</p>
        </div>
        <div class="music-players">
          <h4>Music:</h4>
          <div v-if="artist.music_links.length == 0">
            <p>This artist doesn't have any music links yet!</p>
          </div>
          <div class="music-player-small" v-for="link in artist.music_links">
            <iframe class="music-player-right" v-if="link.url.split('.')[1] === 'bandcamp'" :src="`${link.url}`" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <iframe class="music-player-left" v-if="link.url.split('.')[1] === 'spotify' && link.url.split('/')[3] === 'album'" :src="`https://open.spotify.com/embed/album/${link.url.split('/')[4]}`" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <div v-if="link.url.split('.')[1] === 'spotify' && link.url.split('/')[3] === 'artist'">
              <a class="btn btn-dark" :href="`${link.url}`">Go to {{artist.name}}'s Spotify</a>
             </div>
            <!-- <a :href="`${link.url}`">{{link.url}}</a> -->
          </div>
        </div>
        
        <div v-for="image in images">
          <img class="img-fluid" :src="image.url" height=200px>
        </div>
        <br>
        <h4>Social Media:</h4>
        <div v-if="artist.media_links.length == 0">
          <p>This artist hasn't linked any social media yet!</p>
        </div>
        <div v-for="link in artist.media_links">
          <a :href="`${link.url}`">{{link.url}}</a>
        </div>
      </div>
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
      artist: [],
      images: [],
      currentUser: {},
      readyToSend: false,
      messageText: "",
      myArtist: {},
      errors: [],
      message: {},
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
      .get("/api/users/" + localStorage.getItem("userId"))
      .then(response => {
        this.currentUser = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    openMessenger: function() {
      this.readyToSend = !this.readyToSend;
    },
    sendMessage: function() {
      var params = {
        artist_id: this.myArtist.id,
        recipient_id: this.artist.id,
        text: this.messageText,
      };
      this.message = params;
      console.log(this.message);
      console.log("current user id: " + this.currentUser.id);
      axios
        .post("/api/messages", params)
        .then(response => {
          this.message = response.data;
          console.log(this.message);
        })
        .catch(error => {
          this.errors.push(error);
          console.log(error);
        });
    },
  },
};
</script>