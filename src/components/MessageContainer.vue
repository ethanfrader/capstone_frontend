<template>
  <div class="message-container">
    <message-selectors />
    <!-- <message-toggler /> -->
  </div>
</template>

<script>
import MessageSelectors from "./MessageSelectors";
import MessageToggler from "./MessageToggler";

export default {
  name: "message-container",
  components: {
    MessageSelectors,
    // MessageToggler,
  },
};
</script>