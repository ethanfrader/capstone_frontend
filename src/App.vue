<template>
  <div>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="/"><h1 id="pseudo-logo">GigSpace</h1></a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu<i class="fas fa-bars ml-1"></i></button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav text-uppercase ml-auto">
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/about">About</a></li>
                                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/artists">Artists</a></li>
                    <li class="nav-item" v-if="!jwt"><a class="nav-link js-scroll-trigger" href="/signup">Signup</a></li>
                    <li class="nav-item" v-if="!jwt"><a class="nav-link js-scroll-trigger" href="/login">Login</a></li>
                    <li class="nav-item" v-if="jwt"><a class="nav-link js-scroll-trigger" href="/messages">Messages</a></li>
                    <li class="nav-item" v-if="jwt"><a class="nav-link js-scroll-trigger" href="/posts">All Posts</a></li>
                    <li class="nav-item" v-if="jwt"><a class="nav-link js-scroll-trigger" :href="`/users/${user.id}`">Hi {{user.first_name}}!</a></li>
                    <li class="nav-item" v-if="jwt"><a class="nav-link js-scroll-trigger" href="/logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>
  <!-- <div id="app"> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!jwt" to="/signup">Signup</router-link> |
      <router-link v-if="!jwt" to="/login">Login</router-link> |
      <router-link v-if="jwt" to="/logout">Logout</router-link> |
      <router-link to="/artists">Artists</router-link> |
      <router-link v-if="jwt" :to="`/users/${userId}`">Hi, {{user.first_name}}</router-link> |
      <router-link v-if="jwt" to="/messages">Messages</router-link> |
      <router-link v-if="jwt" to="/posts">Posts</router-link>
    </div> -->

    <router-view/>
    <!-- Footer-->
    <footer class="footer py-4">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-4 text-lg-left">Copyright © GigSpace 2020</div>
                <div class="col-lg-4 my-3 my-lg-0">
                    <a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a><a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a><a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <div class="col-lg-4 text-lg-right"><a class="mr-3" href="#!">Privacy Policy</a><a href="#!">Terms of Use</a></div>
            </div>
        </div>
    </footer>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      jwt: null,
      userId: "",
      user: {},
    };
  },
  created: function() {
    this.setJwt();
    this.setUserId();
  },
  methods: {
    setJwt: function() {
      this.jwt = localStorage.jwt;
    },
    setUserId: function() {
      this.userId = localStorage.userId;
      axios.get("/api/users/" + this.userId).then(response => {
        this.user = response.data;
      });
    },
  },
};
</script>