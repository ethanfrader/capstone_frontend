<template>
  <div>
    <section class="page-section">
      <div class="link-container">
        <router-link to="/posts-new" id="add-post">Add Post</router-link>
      </div>
    <h1>Recent posts:</h1>

    <div v-for="post in posts">
      <div id="post-container">
        <h4>{{post.artist.name}}: </h4><p>{{post.text}}</p>
        <small>Posted at {{post.created_at}}</small>
        <div>
          <button>Send them a message</button>
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