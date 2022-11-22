<template>
  <div class="table-cluster">
    <div class="header-titr-cluster" @click="onShowTableOptionClicked">
      <h5 class="titr-style">Current clusters</h5>
      <i class="far fa-ellipsis-v"></i>
    </div>

    <div v-if="showTableOption" class="cluster-table-option" v-click-outside="onShowTableOptionClicked">
      <ul>
        <li @click="startCluster">
          <div class="cluster-setting-icon">
            <i class="far fa-play"></i>
          </div>
          Start
        </li>
        <li @click="stopCluster">
          <div class="cluster-setting-icon">
            <i class="far fa-stop"></i>
          </div>
          Stop
        </li>
        <li @click="terminateCluster">
          <div class="cluster-setting-icon">
            <i class="far fa-times"></i>
          </div>
          Terminate
        </li>
      </ul>
    </div>

    <table class="table cluster-menu">
      <thead>
      <tr>
        <th>Name</th>
        <th>ID</th>
        <th>Status</th>
        <th>CPU</th>
        <th>RAM</th>
        <th>GPU</th>
        <th>Model</th>
        <th>Tags</th>
        <th>
          <input
            class="form-check-input tools-option-input"
            type="checkbox"
            :checked="bSelectedAll"
            @click="selectAll"
          />
        </th>
      </tr>
      </thead>

      <tbody>
      <cluster-row v-for="cluster in clusters" :key="cluster.id" :cluster="cluster"/>
      </tbody>
    </table>
  </div>
</template>

<script>
import ClusterRow from "@/components/clusters/ClusterRow.vue";
import { ref, computed, inject } from "vue";
import { useClusterStore } from "@/store/clusters.js";

export default {
  name: "ClusterTable",
  components: { ClusterRow },
  props: {
    clusters: Array,
  },
  setup() {
    const showTableOption = ref(false)
    const clusterStore = useClusterStore()
    const toast = inject("toast")

    const startCluster = async () => {
      if (!clusterStore.isSelectedOne) {
        toast.warning('Please select only one instance.')
        return
      }

      try {
        onShowTableOptionClicked()
        await clusterStore.startCluster()
      } catch (err) {
        toast.warning(err.message)
      }
    }

    const stopCluster = async () => {
      if (!clusterStore.isSelectedOne) {
        toast.warning('Please select only one instance.')
        return
      }

      try {
        onShowTableOptionClicked()
        await clusterStore.stopCluster()
      } catch (err) {
        toast.warning(err.message)
      }
    }
    
    const terminateCluster = async () => {
      if (!clusterStore.isSelectedOne) {
        toast.warning('Please select only one instance.')
        return
      }

      try {
        onShowTableOptionClicked()
        await clusterStore.terminateCluster()
      } catch (err) {
        toast.warning(err.message)
      }
    }

    const onShowTableOptionClicked = () => {
      showTableOption.value = !showTableOption.value
    }

    const selectAll = () => {
      clusterStore.selectAll()
    }

    const bSelectedAll = computed(() => {
      return clusterStore.selected.length && clusterStore.selected.length == clusterStore.clusters.length
    })

    return {
      showTableOption,
      onShowTableOptionClicked,
      startCluster,
      stopCluster,
      terminateCluster,
      selectAll,
      bSelectedAll
    }
  }
}
</script>