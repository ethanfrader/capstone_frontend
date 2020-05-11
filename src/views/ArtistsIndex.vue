<template>
  <div class="artists">
    <section>
      <div class="container">
        <div class="text-center">
          <h1 class="section-heading text-uppercase">Artists</h1>
          <div class="row">
            <div v-for="artist in artists">
              <div class="col-lg-4 col-sm-6 mb-4">
                <a :href="`/artists/${artist.id}`">
                <div class="portfolio-item">
                    <img class="img-fluid" :src="`${artist.images[0].url}`" alt="" />
                  <div class="portfolio-caption">
                    <div class="portfolio-caption-heading">{{artist.name}}</div>
                    <div class="portfolio-caption-subheading text-muted">{{artist.location}}</div>
                  </div>
                </div>
                </a>
              </div>
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
      artists: [],
    };
  },
  created: function() {
    axios
      .get("/api/artists")
      .then(response => {
        this.artists = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {},
};
</script>