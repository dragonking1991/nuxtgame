<script setup>
import {
  listenToParentMessages,
  sendLoginEvent,
  sendGetProfileEvent,
  sendSignupEvent,
} from "~/utils/services";


onMounted(() => {
  // listenToParentMessages()
});
</script>

<template>
  <!-- <h3 class="my-5 cursor-pointer" @click="sendLoginEvent">Log in</h3>
  <h3 class="my-5 cursor-pointer" @click="sendSignupEvent">Sign up</h3>
  <h3 class="my-5 cursor-pointer" @click="sendGetProfileEvent">getProfile</h3> -->
  <GameCanvasFrame />

</template>

<style scoped lang="scss"></style>