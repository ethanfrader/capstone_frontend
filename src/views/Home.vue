<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h4>{{ body }}</h4>
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      message: "Welcome to GigSpace!",
      body: "Please sign in or sign up to continue.",
    };
  },
  created: function() {},
  methods: {},
};
</script>