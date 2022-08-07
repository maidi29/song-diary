<script lang="ts">
import {defineComponent} from "vue";
import Button from "@/components/Button.vue";

export default defineComponent({
  components: {Button},
  methods: {
    async doLogin() {
      window.location.href = '/api/login';
    },
  },
})

</script>

<template>
  <h1>Music Diary</h1>
  <h3>The Music Diary analyzes the Spotify tracks you listened to yesterday and generates a diary entry from them
    that reflects your mood and activities.</h3>
  <h3>See for yourself how much your listening habits reveal about your day.</h3>
  <Button v-on:click="doLogin">Start</Button>
</template>

<style scoped lang="scss">
  @use './src/assets/theme';
  h3 {
    font-weight: normal;
  }
</style>
