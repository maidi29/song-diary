<script lang="ts">
import { defineComponent } from "vue";
import type { DiaryData } from "@/model/diaryData";
import Diary from "@/components/Diary.vue";
import Chart from "@/components/Chart.vue";

declare interface BaseComponentData {
  diaryData?: DiaryData;
  errorMessage?: string;
  chartData: {
    mean: number[];
    standardDeviation: number[]
  }
}
export default defineComponent({
  components: {Chart, Diary },
  data(): BaseComponentData {
    return {
      diaryData: undefined,
      errorMessage: undefined,
      chartData: {
        mean: [],
        standardDeviation: []
      }
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
      if (this.diaryData) {
        var { key, mode, time_signature, ...chartDataMean } = this.diaryData.mean;
        var { key, mode, time_signature, ...chartDataStandardDeviation } = this.diaryData.standardDeviation;
        chartDataMean.loudness = chartDataMean.loudness * (-1);
        this.chartData = {
          mean: Object.values(chartDataMean),
          standardDeviation: Object.values(chartDataStandardDeviation)
        }
      }

    })();
  },
});
</script>

<template>
  <div class="diary-view">
    <template v-if="diaryData">
      <Diary :data="diaryData" />
      <details>
        <summary>Data</summary>
        <Chart :data="chartData" />
      </details>
    </template>
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
summary {
  width: 100%;
  background: darken(theme.$color-background,10);
  color: theme.$color-primary;
  padding: 1rem;
  text-align: left;
  cursor: pointer;
}
details {
  background: darken(theme.$color-background,15);
  width: 100vw;
  max-width: 800px;
}
</style>
