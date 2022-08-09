<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

export default defineComponent({
  components: { Button, LottieAnimation },
  methods: {
    async doLogin() {
      window.location.href = "/api/login";
    },
  },
});
</script>

<template>
  <h1>The Music Diary</h1>
  <h3>
    The Music Diary analyzes the songs you listened to yesterday and generates a
    diary entry from them, reflecting your mood and activities.
  </h3>
  <h3>Learn how much your listening habits reveal about your day.</h3>
  <Button v-on:click="doLogin">Start</Button>
  <lottie-animation
    class="animation"
    path="lotties/music.json"
    :loop="true"
    :autoPlay="true"
    :speed="1"
    :height="150"
  />
</template>

<style scoped lang="scss">
@use "./src/assets/theme";
h3 {
  font-weight: normal;
}
.animation {
  margin-top: -1rem;
}
</style>
