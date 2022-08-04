<script lang="ts">

import {defineComponent} from "vue";
declare interface BaseComponentData {
  result?: Response;
}

export default defineComponent({
  data(): BaseComponentData {
    return {
      result: undefined
    }
  },
  mounted() {
     (async () => {
      const response = await fetch('http://localhost:3000/api/diarydata');
       if (!response.ok) {
         const message = `An error has occured: ${response.status}`;
         throw new Error(message);
       }
       this.result = await response.json();
    })();
  }
})

</script>

<template>
  <div class="diary">
    <h1>Diary</h1>
    <div>
      {{JSON.stringify(result)}}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
