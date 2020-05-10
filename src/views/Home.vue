<template>
  <div class="home">
    <header class="masthead">
        <div class="container">
            <div class="masthead-heading text-uppercase">{{message}}</div>
            <div class="masthead-subheading">{{body}}</div>
            <a class="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="/about">Learn More</a>
        </div>
    </header>
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