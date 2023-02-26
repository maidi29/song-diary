<script lang="ts">
import type { Response } from "@/model/response";
import type { PropType } from "vue";
import Book from "@/components/Book.vue";
import { defineComponent } from "vue";
import { generateDiaryText } from "@/util/generateDiaryText";

declare interface BaseComponentData {
  randomImage?: string;
  entryParagraphs: string[];
}

export default defineComponent({
  name: "Diary",
  components: { Book },
  props: {
    entry: {
      type: Object as PropType<string>,
      required: true,
    },
    imageUrl: {
      type: Object as PropType<string>,
      required: true,
    },
    date: {
      type: Object as PropType<string>,
      required: true
    },
  },
  data(): BaseComponentData {
    return {
      randomImage: undefined,
      entryParagraphs: []
    };
  },
  mounted() {
      this.randomImage = this.imageUrl;
      const pattern = /\n/;
      this.entryParagraphs = this.entry.split(pattern);
  },
  methods: {
    generateText: generateDiaryText,
  },
});
</script>

<template>
  <Book>
    <template v-slot:page-left>
      <div class="page-wrapper">
        <div class="date">
          {{
            new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </div>
        <div class="image-wrapper" v-if="randomImage">
          <img :src="randomImage" />
          <span class="paper-clip"></span>
        </div>
        <div />
      </div>
    </template>
    <template v-slot:page-right>
      <div class="text-wrapper">
        <p v-for="paragraph in entryParagraphs">
          {{ paragraph }}
        </p>
      </div>
    </template>
  </Book>
</template>

<style scoped lang="scss">
@use "./src/assets/theme";

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 1rem;
  .date {
    align-self: flex-end;
  }
}

.text-wrapper {
  text-align: left;
  h3,
  p {
    font-weight: normal;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
.image-wrapper {
  img {
    width: 100%;
    transform: rotate(6deg);
  }
  .paper-clip {
    background: none;
    height: 3.5rem;
    width: 1rem;
    border-radius: 10px;
    border: 2px solid theme.$color-secondary;
    display: inline-block;
    position: absolute;
    left: -2rem;
    bottom: 3rem;
    transform: rotate(-116deg);
    &:after {
      width: 11px;
      height: 20px;
      content: " ";
      background: none;
      display: block;
      position: absolute;
      right: 2px;
      top: 5px;
      border: 2px solid theme.$color-secondary;
      border-bottom: 0;
      border-radius: 10px 10px 0 0;
    }
  }
}
</style>
