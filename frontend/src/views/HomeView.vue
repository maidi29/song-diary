<script setup lang="ts">
import TheWelcome from "@/components/Welcome.vue";
</script>

<template>
  <main class="home-view">
    <TheWelcome />
  </main>
</template>

<style scoped lang="scss">
@use "./src/assets/theme";
.home-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
