<template>
  <div :id="chartId"></div>
</template>

<script>
import Plotly from 'plotly.js-dist-min'
import { onMounted, reactive, watch } from "vue";
import Loading from '../common/Loading.vue';

export default {
  name: "PlotlyChart",
  props: {
    traces: {
      type: Array,
      default: () => reactive([]),
    },
    layout: {
      type: Object,
      required: false,
      default: () => {
        return reactive({
          xaxis: "",
          yaxis: "",
        });
      }
    },
    config: {
      type: Object,
      default: () => {
        return {
          responsive: true
        };
      }
    },
    chartId: {
      type: String,
    },
  },
  setup(props) {
    function relayout(layout) {
      return {
        autosize: true,
        margin: {
          t: 30
        },
        xaxis: {
          title: {
            text: layout.xaxis
          },
        },
        yaxis: {
          title: {
            text: layout.yaxis
          }
        }
      };
    }
    onMounted(() => {
      Plotly.newPlot(props.chartId, props.traces, relayout(props.layout), props.config);
    });

    watch(props.traces, (traces) => {
      Plotly.purge(props.chartId);
      Plotly.newPlot(props.chartId, traces, relayout(props.layout), props.config);
    }, { deep: true });
    watch(props.layout, (layout) => {
      Plotly.relayout(props.chartId, relayout(layout));
    }, { deep: true });
  },
  components: { Loading }
}
</script>
