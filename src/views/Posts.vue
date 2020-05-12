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
        <div class="post-image">
        </div>
        <div class="post-body">
          <a class="bold-link" :href="`/artists/${post.artist.id}`">
          <h4>{{post.artist.name}}: </h4>
          </a>
          <div class="post-text">
            <p>{{post.text}}</p>
            <small>Posted at {{post.created_at}}</small>
          </div>
          <div>
          <button class="btn btn-dark">Send them a message</button>
        </div>
        </div>
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
      posts: [],
      user: {},
      currentUser: {},
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
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {},
};
</script>