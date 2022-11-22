<template>
  <div class="chart">
    <div class="setup-header">
      <h6>Account balance</h6>
      <a class="more" href=""
      >Balance Page <i class="fal fa-angle-right"></i
      ></a>
    </div>
    <div class="chart-container">
      <PlotlyChart :chartId="chart.chartId" :traces="chart.traces"/>
    </div>
  </div>
</template>

<script>
import PlotlyChart from "@/components/charts/PlotlyChart.vue";
import {ref, watch} from "vue";

export default {
  name: "AccountBalanceBox",
  components: {PlotlyChart},
  props: {
    accountBalance: Array,
  },
  setup(props) {

    const chart = ref({
      chartId: "homeChart", traces: [
        {
          x: [],
          y: [],
          z: [],
          mode: "scatter",
          type: "lines",
        }
      ]
    })

    watch(props, (newProps) => {
      let dates = [], values = []
      newProps.accountBalance.forEach(value => {
        dates.push(value.date)
        values.push(value.value)
      })
      chart.value.traces[0].x = dates
      chart.value.traces[0].y = values
    })
    return {chart}
  }
}
</script>

<style scoped>
/* todo remove it after style fixed */
.chart-container {
  height: auto !important;
}
</style>