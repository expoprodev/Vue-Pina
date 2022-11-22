<template>
  <div class="header-title with-btn-header">
    <NavBar :crumbs="store.crumbs"/>
    <div id="result-header-btn" class="header-title-content">
      <h4>New Run</h4>
      <div class="filter-setup-option">
        <SearchField/>
      </div>
    </div>
  </div>

  <div class="main-new-run">
    <div class="newrun-tabs">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-bs-toggle="tab" href="#preUpload"
          >Pre-uploaded</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#myModels"
          >My own models
          </a>
        </li>
      </ul>
      <div class="tab-content run-tabs-body">
        <div id="preUpload" class="tab-pane active">
          <div class="preupload-select-options ">
            <div class="preupload-select-item">
              <h6 class="select-titr">Select the Diphyx model</h6>
              <select
                  aria-label="model"
                  class="form-select form-input"
              >
                <option selected>odt</option>
              </select>
            </div>
            <div class="preupload-select-item">
              <h6 class="select-titr">Select the computational resources</h6>
              <select
                  aria-label="computational resources"
                  class="form-select form-input"
              >
                <option selected>16 CPU, 64 Gig RAM</option>
              </select>
            </div>

          </div>
          <div class="form-check tools-option">
            <input
                checked
                class="form-check-input tools-option-input"
                type="checkbox"
            />
            <label class="form-check-label"
            >Always recive email notification on runs status</label
            >
          </div>
          <div class="run-simulation-setup">
            <h5 class="titr-style">Select the simulation setup</h5>
            <div class="main-new-simulation">

              <div class="presetup-content">
                <SetupItem v-for="setup in store.results" :key="setup.id" :setup="setup" on-click-destination="Home"/>
              </div>

            </div>
          </div>
        </div>
        <div id="myModels" class="tab-pane fade">
          <div class="select-comutional">
            <h4 class="select-titr">Select the computational resources</h4>
            <select
                aria-label="Pre-Configured Clusters"
                class="form-select form-input"
            >
              <option selected>16 CPU, 64 Gig RAM</option>
            </select>
          </div>
          <Button text="Run"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import NavBar from "@/components/navbar/NavBar.vue";
import Button from "@/components/common/Button.vue";
import SearchField from "@/components/navbar/SearchField.vue";
import {useNewRunStore} from "@/store/newRun.js";
import SetupItem from "@/components/home/setup/SetupItem.vue";

export default {
  name: "NewRun",
  components: {
    SearchField,
    Button,
    NavBar,
    SetupItem,
  },
  setup() {
    const store = useNewRunStore()
    store.init()

    return {
      store,
    }
  },
}
</script>

<style scoped>

</style>