<script lang="ts">

import {defineComponent} from "vue";

declare interface BaseComponentData {
  diaryData?: DiaryData;
}

declare interface TrackFeatures {
  danceability: number,
  energy: number,
  key: number,
  loudness: number,
  mode: number,
  speechiness: number,
  acousticness: number,
  instrumentalness: number,
  liveness: number,
  valence: number,
  tempo: number,
  duration_ms: number,
  time_signature: number
}

declare interface DiaryData {
  me: {
    name: string,
    image: string
  },
  mean: TrackFeatures,
  standardDeviation: TrackFeatures,
  count: number
}

export default defineComponent({
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
       }
       this.diaryData = await response.json();
    })();
  }
})

</script>

<template>
  <div class="diary">
    <h1>Diary</h1>
    <div>
      Name: {{diaryData?.me.name}}
      <img :src="diaryData?.me.image" width="300"/>
      Count: {{diaryData?.count}}
      {{JSON.stringify(diaryData?.mean)}}
      {{JSON.stringify(diaryData?.standardDeviation)}}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
