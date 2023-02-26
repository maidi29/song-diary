<script lang="ts">
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { RadarChart } from "echarts/charts";
import { LegendComponent } from "echarts/components";
import VChart from "vue-echarts";
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";

declare interface ChartProps {
  mean: number[];
  standardDeviation: number[];
}

use([CanvasRenderer, RadarChart, LegendComponent]);
export default defineComponent({
  name: "Chart",
  components: {
    VChart,
  },
  props: {
    data: {
      type: Object as PropType<ChartProps>,
      required: true,
    },
  },
  setup(props) {
    const option = ref({
      autoresize: true,
      legend: {
        orient: "vertical",
        left: "left",
        data: ["Mean", "Standard Deviation"],
        icon: "circle",
        textStyle: {
          color: "#fff",
          fontFamily: "Montserrat, sans-serif",
        },
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: "Danceability", max: 1 },
          { name: "Energy", max: 1 },
          { name: "Softness", max: 60 },
          { name: "Speechiness", max: 1 },
          { name: "Acousticness", max: 1 },
          { name: "Instrumentalness", max: 1 },
          { name: "Liveness", max: 1 },
          { name: "Valence", max: 1 },
          { name: "Tempo", max: 200 },
          { name: "Duration", max: 1000000 },
        ],
        axisName: {
          overflow: "breakAll",
          color: "#fff",
          fontFamily: "Montserrat, sans-serif",
        },
        splitArea: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: "#7678ED",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#7678ED",
          },
        },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: props.data.mean,
              name: "Mean",
              symbol: "none",
              itemStyle: {
                color: "#F35B04",
              },
            },
            {
              value: props.data.standardDeviation,
              name: "Standard Deviation",
              symbol: "none",
              itemStyle: {
                color: "#F18701",
              },
            },
          ],
        },
      ],
    });

    return { option };
  },
});
</script>

<template>
  <div class="chart-wrapper">
    <v-chart class="chart" :option="option" />
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  height: 100vw;
  max-height: 400px;
  width: 100vw;
  max-width: 800px;
  padding: 1rem;
}
</style>
