<template>
  <div class="header-title with-btn-header">
    <NavBar :crumbs="store.crumbs"/>
    <div id="result-header-btn" class="header-title-content">
      <h4>Result List</h4>
    </div>
  </div>
  <div class="main-simulation">
    <ResultBox :results="store.results"/>
  </div>
</template>

<script>
import ResultBox from "@/components/result/ResultBox.vue";
import {useSetupResultListStore} from "@/store/setupResultsList.js";
import NavBar from "@/components/navbar/NavBar.vue";

export default {
  name: "SetupResultsList",
  components: {ResultBox, NavBar},
  setup() {
    const store = useSetupResultListStore()
    store.init()

    return {
      store,
    }
  },
}
</script>

<style scoped>

</style>