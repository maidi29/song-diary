<script lang="ts">
import {defineComponent} from "vue";
import type {DiaryData} from "@/model/diaryData";
import Diary from "@/components/Diary.vue";

declare interface BaseComponentData {
  diaryData?: DiaryData;
  errorMessage?: string;
}
export default defineComponent({
  components: {Diary},
  data(): BaseComponentData {
    return {
      diaryData: undefined
    }
  },
  mounted() {
     (async () => {
      const response = await fetch('/api/diarydata');
       if (!response.ok) {
         const message = `An error has occured: ${response.status}`;
         throw new Error(message);
       } else if (response.status === 204) {
         this.errorMessage = "You didn't listen to music yesterday :("
       }
       this.diaryData = await response.json();
    })();
  }
})

</script>

<template>
  <div class="diary-view">
    <header>
      <nav>
        <RouterLink to="/" class="router-link">Back to Start screen</RouterLink>
      </nav>
    </header>
    <Diary v-if="diaryData" :data="diaryData"/>
  </div>
</template>

<style scoped lang="scss">
@use './src/assets/theme';
.router-link {
  color: theme.$color-secondary;
}
.diary-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>

