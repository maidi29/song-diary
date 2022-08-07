<script lang="ts">
import type {DiaryData} from "@/model/diaryData";
import type {PropType} from "vue";

export default {
  name: "Diary",
  props: {
    data: {
      type: Object as PropType<DiaryData>,
      required: true
    }
  },
}
</script>

<template>
  Date: {{new Date(data.date).toLocaleDateString()}}
  Name: {{data.me.name}}
  <img v-if="data.me.image" :src="data.me.image" width="300"/>
  Count: {{data.count}}
  {{JSON.stringify(data.mean)}}
  {{JSON.stringify(data.standardDeviation)}}
</template>

<style scoped lang="scss">

</style>