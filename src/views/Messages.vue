<template>
  <div>
    <div>
      <section class="page-section">
        <!-- <message-container /> -->
        <!-- <h4 v-for="message in messages">{{message.recipient.name}} - {{message.recipient.id}}</h4> -->
        <form v-on:submit.prevent="submit()">
        <h1>Your Messages</h1>
        <div class="filter">
          <label for="basic-dropdown">Your artist page: </label>
          <select name="basic-dropdown" v-model="artist">
            <option v-for="artist in allArtists" :value="artist">{{artist.name}}</option>
          </select>
          <label for="basic-dropdown">Conversation with: </label>
          <select name="basic-dropdown" v-model="receivingArtist">
            <option v-for="message in messages" :value="message">{{message.recipient.name}}</option>
          </select>
        </div>
        <!-- <input type="submit" class="btn btn-primary" value="Submit"> -->
      </form>

      <p>I am {{artist.name}} sending to {{receivingArtist.artist}}</p>

      <form v-if="this.artist.id !== undefined && this.receivingArtist.id !== undefined" v-on:submit.prevent="submit()">
        <label>New message for {{receivingArtist.artist.id}}: </label>
        <input type="text" v-model="messageText">
      </form>
      <br>
      <div v-for="message in messages">
        <p v-if="message.artist.id === artist.id && message.recipient.id === receivingArtist.id" class="sent-message">{{message.text}}</p>

        <p v-if="message.recipient.id === artist.id && message.artist.id === receivingArtist.id" class="received-message">{{message.text}}</p>
      </div>
      </section>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

// import MessageContainer from "../components/MessageContainer";

export default {
  components: {
    // MessageContainer,
  },
  data: function() {
    return {
      messages: [],
      user: {},
      currentUser: {},
      allArtists: [],
      artist: {},
      artistMessages: [],
      receivingArtist: {},
      messageText: "",
      sendTo: {},
    };
  },
  created: function() {
    axios
      .get("/api/messages")
      .then(response => {
        console.log(response.data);
        this.messages = response.data;
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
    startMessage: function() {},
  },
};
</script>