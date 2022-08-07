<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    async doLogin() {
      window.location.href = '/api/login';
    },
  },
})

</script>

<template>
  <h1>Hello</h1>
  <button v-on:click="doLogin">Log in</button>
</template>
