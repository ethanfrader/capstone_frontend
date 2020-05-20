<template>
  <div class="about-page">
    <div class="container">
    <section>
      <header>
        <h1 id="masthead-subheading">GigSpace: DIY Networking Made Simple</h1>
      </header>
      <div v-for="paragraph in body" class="about-paragraphs">
        <p>{{paragraph}}</p>
      </div>
      <h4 class="about-signoff">Practice hard. Gig hard. - GigSpace</h4>
    </section>
  </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      body: [
        "One of the hardest aspects of getting out of the practice space and onto the stage is networking with other bands. This is especially true for newer acts as well as artists that find themselves in a new city, looking for their big break.",
        "GigSpace takes the stress out of the networking search. With a growing community of local artists, users are free to curate their profiles, post album or gig details in an ever-growing feed, and get to know one another in direct artist-to-artist messaging.",
        "Whether you're looking for a place to network or just simply looking to promote your hard work, GigSpace is here to support you on your musical journey.",
      ],
    };
  },
};
</script>