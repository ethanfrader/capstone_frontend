<template>
  <div class="message-container">
    <message-selectors />
    <!-- <note-editor /> -->
  </div>
</template>

<script>
import MessageSelectors from "./MessageSelectors";
// import NoteEditor from "./NoteEditor";

export default {
  name: "message-container",
  components: {
    MessageSelectors,
    // NoteEditor,
  },
};
</script>