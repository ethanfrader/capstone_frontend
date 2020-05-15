<template>
  <div>
    <div>
      <section class="page-section">
        <!-- <message-container /> -->
        <!-- <h4 v-for="message in messages">{{message.recipient.name}} - {{message.recipient.id}}</h4> -->
        <form v-on:submit.prevent="submit()">
          <h1>Your Messages</h1>
          <div class="filter">
            <label for="basic-dropdown">Your artist page:</label>
            <select name="basic-dropdown" v-model="artist">
              <option v-for="artist in allArtists" :value="artist">{{ artist.name }}</option>
            </select>
            <label for="basic-dropdown">Conversation with:</label>
            <select name="basic-dropdown" v-model="receivingArtist">
              <option v-for="receivingArtist in receivingArtists" :value="receivingArtist">
                {{ receivingArtist.name }}
              </option>
            </select>
          </div>
          <!-- <input type="submit" class="btn btn-primary" value="Submit"> -->
        </form>

        <div v-if="artist.id && receivingArtist.id">
          <h4>{{ artist.name }}'s conversation with {{ receivingArtist.name }}:</h4>
        </div>

        <div v-if="artist.id && receivingArtist.id">
          <form action="v-on:submit.prevent=submit()">
            <textarea name="New Message" id="" cols="60" rows="3" v-model="messageText"></textarea>
            <div class="container">
              <button v-on:click="sendMessage()" class="btn btn-primary">Send Message</button>
            </div>
          </form>
        </div>
        <br />

        <div v-for="message in messages">
          <div
            v-if="message.artist.id === artist.id && message.recipient.id === receivingArtist.id"
            class="sent-message"
          >
            <p>{{ message.text }}</p>
            <small class="tiny-date">Sent {{ message.sent_at | moment("from", "now") }}</small>
          </div>

          <div
            v-if="message.recipient.id === artist.id && message.artist.id === receivingArtist.id"
            class="received-message"
          >
            <p>{{ message.text }}</p>
            <small class="tiny-date">Received {{ message.sent_at | moment("from", "now") }}</small>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style></style>

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
      receivingArtists: [],
      messageText: "",
      sendTo: {},
    };
  },
  created: function() {
    axios
      .get("/api/messages")
      .then(response => {
        console.log(response.data);
        var receivers = [];
        this.messages = response.data;
        this.messages.forEach(function(message) {
          console.log(message.recipient);
          receivers.push(message.recipient);
        });
        this.receivingArtists = receivers;
        console.log("receiving artists:");
        console.log(this.receivingArtists);
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
    sendMessage: function() {
      var params = {
        artist_id: this.artist.id,
        recipient_id: this.receivingArtist.id,
        text: this.messageText,
      };
      axios
        .post("/api/messages", params)
        .then(response => {
          this.$router.push("/messages");
          console.log(this.message);
        })
        .catch(error => {
          this.errors.push(error);
          console.log(error);
        });
    },
    howLongAgo: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
