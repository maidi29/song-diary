<script lang="ts">
import type {DiaryData} from "@/model/diaryData";
import type {PropType} from "vue";
import Book from "@/components/Book.vue";

export default {
  name: "Diary",
  components: {Book},
  props: {
    data: {
      type: Object as PropType<DiaryData>,
      required: true
    }
  },
}
</script>

<template>
  <Book>
    <template v-slot:page-left>
      Date: {{new Date(data.date).toLocaleDateString()}}
      Name: {{data.me.name}}
      <img v-if="data.me.image" :src="data.me.image"/>
      Count: {{data.count}}
    </template>
    <template v-slot:page-right>
      {{JSON.stringify(data.mean)}}
      {{JSON.stringify(data.standardDeviation)}}
    </template>
  </Book>
</template>

<style scoped lang="scss">
  img {
    width: 45%;
  }
</style>