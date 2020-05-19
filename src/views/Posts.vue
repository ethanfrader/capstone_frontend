<template>
  <div>
    <section class="page-section">
      <div class="text-center">
        <div>
          <router-link class="btn btn-xl btn-accent" to="/posts-new" id="add-post">Add Post</router-link>
        </div>
      </div>
      <h1>Recent posts:</h1>

      <div v-for="post in posts">
        <div id="post-container">
          <div class="post-image"></div>
          <div class="post-body">
            <a class="bold-link" :href="`/artists/${post.artist.id}`">
              <h4>{{ post.artist.name }}:</h4>
            </a>
            <div class="post-text">
              <p>{{ post.text }}</p>
              <small>Posted {{ post.created_at | moment("from", "now") }}</small>
            </div>
            <div>
              <button v-on:click="newMessage(post)" class="btn btn-dark">Send them a message</button>
            </div>
            <div v-if="post === currentPost">
              <form action="v-on:submit.prevent=submit()">
                <label for="">New Message:</label>
                <input type="text" v-model="messageText" />
                <label for="basic-dropdown">Your artist page:</label>
                <select name="basic-dropdown" v-model="selectedArtist">
                  <option v-for="artist in allArtists" :value="artist">{{ artist.name }}</option>
                </select>
                <button class="btn-dark" v-on:click="sendMessage()">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style></style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      posts: [],
      user: {},
      currentUser: {},
      allArtists: [],
      selectedArtist: {},
      readyForMessage: false,
      currentPost: {},
      messageText: "",
    };
  },
  created: function() {
    axios
      .get("/api/posts")
      .then(response => {
        console.log(response.data);
        this.posts = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("/api/users/" + localStorage.getItem("userId"))
      .then(response => {
        this.currentUser = response.data;
        console.log(this.currentUser);
        this.allArtists = this.currentUser.artists;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    newMessage: function(post) {
      if (post === this.currentPost) {
        this.currentPost = {};
      } else {
        this.currentPost = post;
      }
    },
    sendMessage: function() {
      var params = {
        artist_id: this.selectedArtist.id,
        recipient_id: this.currentPost.artist.id,
        text: this.messageText,
      };
      console.log("params:");
      console.log(params);
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
