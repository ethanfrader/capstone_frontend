<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!jwt" to="/signup">Signup</router-link> |
      <router-link v-if="!jwt" to="/login">Login</router-link> |
      <router-link v-if="jwt" to="/logout">Logout</router-link> |
      <router-link to="/artists">Artists</router-link> |
      <router-link v-if="jwt" :to="`/users/${userId}`">Hi, {{user.first_name}}</router-link> |
      <router-link v-if="jwt" to="/messages">Messages</router-link>
    </div>

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
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