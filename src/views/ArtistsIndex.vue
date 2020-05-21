<template>
  <div class="backing-bars">
    <div class="container primary-content">
    <section>
        <div class="right-side-search">
          <input type="text" v-model="search" placeholder="Search for artists...">
        </div>
        <div class="text-center">
          <h1 class="section-heading text-uppercase" id="artists-header">Artists</h1>
          <div class="row row-cols-2">
            <div v-for="artist in filteredArtists">
              <div v-if="artist.images.length > 0">
                <div class="col">
                  <a :href="`/artists/${artist.id}`">
                    <div class="portfolio-item">
                        <img class="img-fluid" :src="`${artist.images[0].url}`" alt="" />
                      <div class="">
                        <div class="">
                          <h4 class="subheading">{{artist.name}}</h4>
                        </div>
                        <div class="portfolio-caption-subheading text-muted m-3">{{artist.location}}</div>
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
      search: "",
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
  computed: {
    filteredArtists() {
      return this.artists.filter(artist => {
        return artist.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {},
};
</script>