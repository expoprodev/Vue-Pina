<template>
  <edit-tabs v-if="store.tabs.length" />
  <div class="header-title with-btn-header">
    <nav-bar :crumbs="store.crumbs" />
    <div id="result-header-btn" class="header-title-content">
      <h4>Result</h4>
      <button class="btn btn-style" @click="onClickSave">Save</button>
    </div>
  </div>
  <div class="main-result">
    <Loading :loading="store.isLoading" />
    <div v-if="!store.isLoading" id="simulationInfoAccordion" class="setup-result-info accordion">
      <div class="accordion-item">
        <h2 id="headingName" class="accordion-header">
          <button aria-controls="collapseOne" aria-expanded="true" class="accordion-button"
            data-bs-target="#collapseOne" data-bs-toggle="collapse" type="button">
            {{ store.setup.modelType }}
          </button>
        </h2>
        <div id="collapseOne" aria-labelledby="headingName" class="accordion-collapse collapse show"
          data-bs-parent="#simulationInfoAccordion">
          <div class="accordion-body">
            <div class="row">
              <div class="col-md-4 col-xl-3">
                <div class="brand-name"> {{ store.setup.name }}
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-xl-3">
                <h4>Simulation Time</h4>
                <div class="simulation-time margin-class">
                  Start: {{ store.setup.simulationConfig.start }}
                  End: {{ store.setup.simulationConfig.end }}
                </div>
                <div class="simulation-time">
                  Time step: {{ store.setup.simulationConfig.timeStep }}
                </div>
              </div>
              <div class="col-sm-6 col-md-4 col-xl-3">
                <h4 class="cluster-title">Cluster: {{ store.setup.cluster.name }}</h4>
                <div class="simulation-time margin-class">
                  Start Time: {{ dateFormatter(store.setup.cluster.startTime) }}
                </div>
                <span class="simulation-time">End Time: {{ dateFormatter(store.setup.cluster.endTime) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!store.isLoading" class="row simulation-chart-selection">
      <div class="col-md-4 col-lg-6">
        <select v-model="store.selectedField" aria-label="Default select " class="form-select"
          @change="onChangeModel">
          <option v-if="store.isLoading" selected>Loading</option>
          <option v-for="option in store.setup.fields" :key="option.displayName" :value="option">{{ option.displayName
          }}
          </option>
        </select>
      </div>
      <div class="col-md-8 col-lg-6">
        <div class="selection-tabs">
          <ul class="nav nav-tabs" role="tablist">
            <li v-for="(tab, tabIndex) in store.tabs" :key="tab.id" class="nav-item"
              @click="store.onTabClicked(tabIndex)">
              <a :class="{ 'active': tabIndex === store.selectedTab }" :href="'#' + tab.id" class="nav-link"
                data-bs-toggle="tab">{{ tab.label }}</a>
            </li>

          </ul>
          <button id="editTabNameBtn" class="btn" data-bs-target="#editingTabModal" data-bs-toggle="modal"
            type="button">
            <i class="far fa-edit"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="!store.isLoading" :data-version="store.hasChanged" class="tab-content">

      <div v-for="(tab, tabIndex) in store.tabs" :id="tab.id" :key="tab.id"
        :class="{ 'active': tabIndex === store.selectedTab }" class="tab-pane">

        <div class="row">
          <div v-for="(menu) in tab.menus" :key="menu.id" :class="['col-md-' + menu.weight]">
            <div class="simulation-chart-card">
              <div class="icon-container">
                <i class="fas fa-ellipsis-v"></i>
              </div>
              <div v-if="menu.chart" class="simulation-chart">
                <plotly-chart
                  :chartId="menu.chart.chartId"
                  :config="menu.chart.config"
                  :layout="menu.chart.layout"
                  :traces="menu.chart.traces"
                  :loading="menu.isChartDataLoading"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import PlotlyChart from "@/components/charts/PlotlyChart.vue";
import { useSetupResultStore } from "@/store/setupResultStore.js";
import dateFormatter from "@/compositions/helper/dateHelper.js";
import NavBar from "@/components/navbar/NavBar.vue";
import EditTabs from "@/views/result/EditTabs.vue";
import Loading from "@/components/common/Loading.vue";

export default {
  name: 'SetupResultDetail',
  components: { Loading, EditTabs, NavBar, PlotlyChart },
  setup() {
    const store = useSetupResultStore()
    const toast = inject('toast')
    store.init()

    const onChangeModel = async () => {
      const result = await store.onFieldChange()
      if (result == 'duplicated') {
        toast.warning('Duplicated Model in one tab')
      }
    }

    const onClickSave = async () => {
      try {
        await store.onSaveClicked()
        toast.success('Successfully saved!')
      } catch (e) {
        toast.warning('Failed to save')
      }
    }

    return { store, dateFormatter, onChangeModel, onClickSave }
  }
}
</script>

<style scoped>
</style>
