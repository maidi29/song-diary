<script lang="ts">
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {ScatterChart} from "echarts/charts";
import VChart from "vue-echarts";
import {defineComponent, ref} from "vue";
import type {PropType} from "vue";
import type {MappedSongData} from "../../../shared/model";
// stay because of formatter function
import * as echarts from "echarts";

declare interface ScatterChartProps {
  mappedSongData: MappedSongData[];
  mean?: {
    valence: number,
    arousal: number
  };
  standardDeviation?: {
    valence: number,
    arousal: number
  };
}

use([CanvasRenderer, ScatterChart]);
export default defineComponent({
  name: "ScatterChart",
  components: {
    VChart,
  },
  props: {
    data: {
      type: Object as PropType<ScatterChartProps>,
      required: true,
    },
  },
  setup(props) {
    const option = ref({
      legend: {
        show: false
      },
      autoresize: true,
      xAxis: {
        type: 'value',
        name: 'Valence',
        splitLine: {show: false},
        axisTick: {show: false},
        axisLine: {
          lineStyle: {
            color: '#7678ED'
          }
        },
        min: -1,
        max: 1,
        nameTextStyle: {
          color: "#fff",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "bold"
        },
        axisLabel: {
          color: "#7678ED",
          fontFamily: "Montserrat, sans-serif",
          formatter: function (value: number) {
            if (value === 1) {
              return 'positive';
            } else if (value === -1) {
              return 'negative';
            }
            return '';
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Arousal',
        splitLine: {show: false},
        axisTick: {show: false},
        min: -1,
        max: 1,
        axisLine: {
          lineStyle: {
            color: '#7678ED'
          }
        },
        nameTextStyle: {
          color: "#fff",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "bold"
        },
        axisLabel: {
          color: "#7678ED",
          fontFamily: "Montserrat, sans-serif",
          formatter: function (value: number) {
            if (value === 1) {
              return 'high';
            } else if (value === -1) {
              return 'low';
            }
            return '';
          }
        }
      },
      tooltip: {
        textStyle: {
          color: "#3D348B",
          fontFamily: "Montserrat, sans-serif",
        },
        formatter: function (data: { value: any[] }) {
          const standardDeviation = props.data.standardDeviation ?
              `<div>Standard Deviation:
                    Valence: ${(Math.round(props.data.standardDeviation.valence * 100) / 100).toFixed(2)},
                    Arousal: ${(Math.round(props.data.standardDeviation.arousal * 100) / 100).toFixed(2)}</div>` : '';
          const playedCount = data.value[3] === "Mean" ?
              standardDeviation :
              `<div>Played ${data.value[2]} time${data.value[2] == 1 ? '' : 's'}</div>`;
          return `<div><strong>${data.value[3]}</strong></div>
              <div>${data.value[4]}</div>
              <div>Valence: ${(Math.round(data.value[0] * 100) / 100).toFixed(2)},
              Arousal: ${(Math.round(data.value[1] * 100) / 100).toFixed(2)}</div>
              ${playedCount}
          `;
        }
      },
      series: [{
        name: "Songs",
        data: props.data.mappedSongData.map((item) => [item.valence, item.arousal, item.count, item.name, item.artists.join(', ')]),
        type: "scatter",
        symbolSize: (data: any) => {
          return data[2] * 5;
        },
        color: '#F35B04'
      }, {
        name: 'Standard Deviation',
        color: '#F7B801',
        data: [[props.data.mean?.valence, props.data.mean?.arousal, 5, "Standard Deviation", "Standard Deviation"]],
        type: 'scatter',
        symbolSize: [(props.data.standardDeviation?.valence || 0) * 100, (props.data.standardDeviation?.arousal || 0) * 100],
        silent: true,
        itemStyle: {
          opacity: 0.3,
        }
      },
        {
          name: 'Mean',
          color: '#F7B801',
          data: [[props.data.mean?.valence, props.data.mean?.arousal, 5, "Mean", "Mean of all songs"]],
          type: 'scatter',
        },
      ],
    });
    return {option};
  },
});
</script>

<template>
  <div class="chart-wrapper">
    <v-chart class="chart" :option="option"/>
  </div>
</template>

<style lang="scss" scoped>
.chart-wrapper {
  height: 100vw;
  max-height: 800px;
  width: 100vw;
  max-width: 800px;
  padding: 1rem;
}
</style>
