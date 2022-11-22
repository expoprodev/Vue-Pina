<template>
  <div class="run-card">
    <div class="run-card-header">
      <h6>{{ result.modelName }}</h6>
      <div class="status">{{ result.statusText }}</div>
    </div>
    <div class="run-card-img">
      <img :src="result.imageUrl" alt=""/>
    </div>
    <div class="run-card-details">
      <span>{{ result.modelType }}</span>
      <div class="simulation-time">
        <span class="card-detail-title">Simulation Time</span>
        <div>
          <span>Start: {{ result.simulationConfig.start }} &nbsp</span>
          <span>&nbsp End: {{ result.simulationConfig.end }}</span>
        </div>
        <div>time step: {{ result.simulationConfig.timeStep }}</div>
      </div>
      <div class="cluster-time">
        <span class="card-detail-title">Cluster: {{ result.cluster.name }}</span>
        <div>Start Time: {{ dateFormatter(result.cluster.startTime) }}</div>
        <div>End Time: {{ dateFormatter(result.cluster.endTime) }}</div>
      </div>
    </div>
    <div class="run-card-footer">
      <div class="btn-icons">
        <div class="btn-icon-item"><i class="far fa-play"></i></div>
        <div class="btn-icon-item">
          <i class="far fa-pause"></i>
        </div>
        <div class="btn-icon-item"><i class="far fa-stop"></i></div>
      </div>
      <router-link :to="{name:'SetupResultDetail',params: { modelName: result.modelName }}">
        <button class="btn">View Results</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import dateFormatter from "@/compositions/helper/dateHelper.js";

export default {
  name: "ResultItem",
  props: ['result'],
  setup() {

    return {
      dateFormatter,
    }
  }
}
</script>

<style scoped>

</style>