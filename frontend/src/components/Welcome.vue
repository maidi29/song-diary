<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Button.vue";
import musicAnimation from '@/assets/music.json';
import bgAnimation from '@/assets/bg.json';

declare interface BaseComponentData {
  musicAnimation: any;
  bgAnimation: any;
}
export default defineComponent({
  components: { Button },
  data(): BaseComponentData {
    return {
      musicAnimation: musicAnimation,
      bgAnimation: bgAnimation
    };
  },
  methods: {
    async doLogin() {
      window.location.href = "/api/login";
    },
  },
});
</script>

<template>
  <h1>Song Diary</h1>
  <h3>
    The Song Diary analyzes the songs you listened to yesterday on Spotify and generates a
    diary entry from them using Artificial Intelligence that reflects your mood and activities.
  </h3>
  <h3>You can also analyze the songs you listened to today in interactive graphs and learn more about
    yourself, your listening habits and your feelings.</h3>
  <Button v-on:click="doLogin"><img src="../assets/spotify-logo.svg" height="20"/>Start</Button>
  <lottie-animation
      class="animation"
      ref="anim"
      :animationData="musicAnimation"
      :loop="true"
      :autoPlay="true"
      :speed="1"
  />
  <lottie-animation
      class="bg"
      ref="anim"
      :animationData="bgAnimation"
      :loop="true"
      :autoPlay="true"
      :speed="0.3"
  />
</template>

<style scoped lang="scss">
@use "./src/assets/theme";
h3 {
  font-weight: normal;
}
.animation {
  margin-top: -1rem;
  height: 150px;
}

.bg {
  position: fixed;
  max-width: 500px;
  width: 80%;
  z-index: -1;
  opacity: 0.3;
}
</style>
