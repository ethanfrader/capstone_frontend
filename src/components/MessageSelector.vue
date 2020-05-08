<template>
    <div class="message-selector" v-bind:class="{active: message.id === selectedMessageId}" >
      <h4 class="message-selector-text">{{ message.text }}</h4>
      <small class="message-selector-to">Sent to {{ message.recipient.name }} at {{message.sent_at}}</small>
    </div>
</template>

<script>
export default {
  name: "message-selctor",
  props: ["message", "selectedMessageId"],
};
</script>