<script lang="ts">
import { defineComponent } from "vue";
import type { Response } from "@/model/response";
import Diary from "@/components/Diary.vue";
import Chart from "@/components/Chart.vue";
import ScatterChart from "@/components/ScatterChart.vue";
import type {MappedSongData} from "../../../shared/model";
import writing from '@/assets/writing.json';

declare interface BaseComponentData {
  response?: Response;
  errorMessage?: string;
  chartData: {
    mean: number[];
    standardDeviation: number[];
  };
  scatterData: MappedSongData[];
  moodMean?: {valence: number, arousal: number};
  moodStandardDeviation?: {valence: number, arousal: number};
  writingAnimation: any
}
export default defineComponent({
  components: { ScatterChart, Chart, Diary },
  data(): BaseComponentData {
    return {
      response: undefined,
      errorMessage: undefined,
      chartData: {
        mean: [],
        standardDeviation: [],
      },
      scatterData: [],
      moodMean: undefined,
      moodStandardDeviation: undefined,
      writingAnimation: writing
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
      this.response = await response.json();
      if (this.response) {
        const chartDataMean = { ...this.response.mean };
        delete (chartDataMean as any).key;
        delete (chartDataMean as any).mode;
        delete (chartDataMean as any).time_signature;
        const { key, mode, time_signature, ...chartDataStandardDeviation } =
          this.response.standardDeviation;
        chartDataMean.loudness = chartDataMean.loudness * -1;
        this.chartData = {
          mean: Object.values(chartDataMean),
          standardDeviation: Object.values(chartDataStandardDeviation),
        };
        this.scatterData = this.response.moodData;
        this.moodMean = this.response.moodMean;
        this.moodStandardDeviation = this.response.moodStandardDeviation;
      }
    })();
  },
});
</script>

<template>
  <div class="diary-view">
    <template v-if="response">
      <Diary
        :entry="response.diaryEntry"
        :image-url="response.imageUrl"
        :date="response.date"
      />
      <details open>
        <summary>
          <h3 class="summary-title">
            Based on data from your listening on
            <img src="@/assets/spotify-logo-text.svg" height="24" alt="Spotify" />
          </h3>
        </summary>
        <div class="charts">
          <div>
            <h4>Valence and Arousal in your songs</h4>
            <ScatterChart :data="{mappedSongData: scatterData, mean: moodMean, standardDeviation: moodStandardDeviation}"/>
          </div>
          <div>
            <h4>All audio features in your songs</h4>
            <Chart :data="chartData" />
          </div>
        </div>
      </details>
    </template>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <div v-else-if="!response" class="loading">
      <lottie-animation
          ref="anim"
          :animationData="writingAnimation"
          :loop="true"
          :autoPlay="true"
          :speed="1"
      />
      <div>Writing... Please wait.</div>
    </div>
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
  flex: 1;
}
summary {
  width: 100%;
  background: darken(theme.$color-background, 10);
  color: theme.$color-primary;
  padding: 1rem;
  text-align: left;
  cursor: pointer;
  .summary-title {
    display: inline;
    margin-left: 1rem;
    img {
      vertical-align: bottom;
      margin-left: 0.5rem;
    }
  }
}
details {
  background: darken(theme.$color-background, 15);
  width: 100vw;
  max-width: 800px;
}
.loading {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.charts {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
}
</style>
