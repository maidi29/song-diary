<script lang="ts">
import { defineComponent } from "vue";
import type { DiaryData } from "@/model/diaryData";
import Diary from "@/components/Diary.vue";

declare interface BaseComponentData {
  diaryData?: DiaryData;
  errorMessage?: string;
}
export default defineComponent({
  components: { Diary },
  data(): BaseComponentData {
    return {
      diaryData: undefined,
      errorMessage: undefined,
    };
  },
  mounted() {
    (async () => {
      const response = await fetch("/api/diarydata");
      if (!response.ok) {
        this.errorMessage =
          "An error has occurred - try to log in again on the start screen:";
        throw new Error(this.errorMessage);
      } else if (response.status === 204) {
        this.errorMessage =
          "You didn't listen to music yesterday or today 😞 Listen to a few songs and then come back again.";
        throw new Error(this.errorMessage);
      }
      this.diaryData = await response.json();
    })();
  },
});
</script>

<template>
  <div class="diary-view">
    <Diary v-if="diaryData" :data="diaryData" />
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <header>
      <nav>
        <RouterLink to="/" class="router-link">Back to start screen</RouterLink>
      </nav>
    </header>
  </div>
</template>

<style scoped lang="scss">
@use "./src/assets/theme";
.router-link {
  color: theme.$color-primary;
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
