<template>
  <tr>
    <td>{{ cluster.imageName }}</td>
    <td>{{ cluster.imageId }}</td>
    <td>{{ cluster.statusName }}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>
      <input
        class="form-check-input tools-option-input"
        type="checkbox"
        :checked="isChecked"
        @click="clickCluster"
      />
    </td>
  </tr>
</template>

<script>
import { useClusterStore } from "@/store/clusters.js";
import { computed } from "vue";

export default {
  name: "ClusterRow",
  props: ['cluster'],
  setup(props) {
    const clusterStore = useClusterStore()
    const isChecked = computed(() => {
      let bSelected = clusterStore.selected.some((instanceId) => props.cluster.instanceId == instanceId)
      return bSelected
    })

    const clickCluster = () => {
      clusterStore.toggleSelection(props.cluster.instanceId)
    }

    return {
      isChecked,
      clickCluster
    }
  }
}
</script>

<style scoped>

</style>