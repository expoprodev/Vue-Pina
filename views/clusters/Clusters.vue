<template>
  <div class="header-title with-btn-header">
    <NavBar :crumbs="store.crumbs"/>

    <div id="result-header-btn" class="header-title-content">
      <h4>Cluster</h4>
    </div>
  </div>

  <div class="main-cluster">
    <Loading :loading="store.isLoading"/>

    <ClusterTable :clusters="store.clusters"/>

    <ClusterForm/>
  </div>
</template>

<script>
import {useClusterStore} from "@/store/clusters.js";
import NavBar from "@/components/navbar/NavBar.vue";
import ClusterTable from "@/components/clusters/ClusterTable.vue";
import ClusterForm from "@/components/clusters/ClusterForm.vue";
import Loading from "@/components/common/Loading.vue";

export default {
  name: 'Clusters',

  components: {Loading, NavBar, ClusterTable, ClusterForm, Loading},
  setup() {
    const store = useClusterStore()
    store.init()
    return {
      store,
    }
  },
}
</script>

<style>

</style>