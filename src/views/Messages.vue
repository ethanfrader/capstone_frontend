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
            
          </div>
          <!-- <input type="submit" class="btn btn-primary" value="Submit"> -->
          <button v-on:click="openConversations()">Open Conversations</button>
        </form>

        <div class="filter" v-if="isReady == true && artist.name">
          <label for="basic-dropdown">Conversation with:</label>
            <select name="basic-dropdown" v-model="receivingArtistName">
              <option v-for="convo in allConversationThreads" :value="convo">
                {{ convo }}
              </option>
            </select>
          <button v-on:click="seeThread()">See Thread</button>
        </div>

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

        <div v-for="message in conversationMessages">
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
      receivingArtist: "",
      receivingArtists: [],
      condensedConversations: [],
      messageText: "",
      sendTo: {},
      currentThread: [],
      allParticipants: [],
      allConversationThreads: [],
      isReady: false,
      receivingArtistName: "",
      conversationMessages: [],
    };
  },
  created: function() {
    axios
      .get("/api/messages")
      .then(response => {
        console.log(response.data);
        var receivers = [];
        this.messages = response.data;
        console.log("messages: ");
        console.log(this.messages);
        this.messages.forEach(function(message) {
          console.log(message.recipient);
          receivers.push(message.recipient);
        });
        this.receivingArtists = receivers;
        console.log("receiving artists:");
        console.log(this.receivingArtists);
        var participants = [];
        this.messages.forEach(function(message) {
          participants.push(message.recipient.name);
          participants.push(message.artist.name);
        });
        this.allParticipants = participants;
        console.log("all participants");
        console.log(this.allParticipants);
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
    openConversations: function() {
      var myArtistName = this.artist.name;
      console.log(myArtistName);
      if (myArtistName !== undefined) {
        this.isReady = !this.isReady;
        console.log("flipped isReady");
      }
      axios
        .get("/api/messages")
        .then(response => {
          // this.currentThread = response.data;
          // console.log(response.data);
          var nonUserParticipants = [];
          console.log(myArtistName);
          this.allParticipants.forEach(function(participant) {
            console.log(participant);
            console.log("participant:");
            if (participant !== myArtistName) {
              nonUserParticipants.push(participant);
            }
          });
          console.log("non user participants");
          console.log(nonUserParticipants);
          var allConversationists = [...new Set(nonUserParticipants)];
          console.log("all conversationists");
          console.log(allConversationists);
          this.allConversationThreads = allConversationists;
        })
        .catch(error => {
          console.log(error);
        });
    },
    seeThread: function() {
      var messagesPlaceholder = [];
      var i = 0;
      while (i < this.messages.length) {
        if (this.messages[i].artist.name === this.artist.name || this.messages[i].recipient.name === this.artist.name) {
          messagesPlaceholder.push(this.messages[i]);
        }
        i += 1;
      }
      if (this.messages[0].artist.id === this.artist.id) {
        this.receivingArtist = this.messages[0].recipient;
      }
      if (this.messages[0].recipient.id === this.artist.id) {
        this.receivingArtist = this.messages[0].artist;
      }
      this.conversationMessages = messagesPlaceholder;
      console.log("refined converstaion messages");
      console.log(this.conversationMessages);
    },
  },
};
</script>
