<template>
  <div class="header-title with-btn-header">
    <NavBar :crumbs="store.crumbs"/>
    <div id="result-header-btn" class="header-title-content">
      <h4>Run</h4>
    </div>
  </div>
  <div class="main-simulation">
    <div class="dimension-setup">
      <router-link :to="{name:'NewRun'}">
        <div class="dimension-setup-item">
          <div class="dimension-setup-element">
            <i class="fas fa-plus"></i>
          </div>
          <span>New run</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>
        </div>
      </router-link>
    </div>

    <div class="runs">
      <div class="setup-header">
        <h6>Your Recent Run</h6>
      </div>
    </div>
    <div class="main-simulation">
      <ResultBox :results="store.results"/>
    </div>
  </div>
</template>

<script>
import {useRunListStore} from "@/store/runList.js";
import ResultBox from "@/components/result/ResultBox.vue";
import NavBar from "@/components/navbar/NavBar.vue";

export default {
  name: "RunList",
  components: {
    ResultBox,
    NavBar,
  },
  setup() {
    const store = useRunListStore()
    store.init()

    return {
      store,
    }
  },
}
</script>

<style scoped>

</style>