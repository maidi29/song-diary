<script lang="ts">

export default {
  mounted() {
     (async () => {
      const result = await fetch('http://localhost:3000/api/diarydata');
      console.log(result);
    })();
  }
}

</script>

<template>
  <div class="diary">
    <h1>Diary</h1>
  </div>
</template>

<style scoped lang="scss">

</style>
