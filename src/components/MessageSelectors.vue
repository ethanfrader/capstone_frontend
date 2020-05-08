<template>
  <div class="message-selectors">
    <message-selector v-for="message in messages" v-bind:message="message" v-bind:selectedMessageId="selectedMessageId" v-bind:key="message.id" />
  </div>
</template>

<script>
var axios = require("axios");
import MessageSelector from "./MessageSelector";

export default {
  name: "message-selectors",
  components: {
    MessageSelector,
  },
  data: function() {
    return {
      messages: [],
      selectedMessageId: 1,
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
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {},
};
</script>