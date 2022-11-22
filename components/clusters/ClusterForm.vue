<template>
  <div class="cluster-setting">
    <h5 class="titr-style">New cluster</h5>
    <form @submit.prevent="createCluster">

      <div class="cluster-setting-body">

        <text-field
          v-model="formStore.data.name"
          :errors="form.name.$errors"
          :has-error="form.name.$error"
          place-holder="Name"
          type="text"
        />

        <div class="input-group has-validation">
          <select
            aria-label="Pre-Configured Clusters"
            class="form-select"
            :class="form.type.$error ? 'is-invalid' : ''"
            v-model="formStore.data.type"
          >
            <!-- <option disabled selected>Pre-Configured Clusters</option> -->
            <option :value="i" v-for="(cluster, i) in preDefinedClusters" :key="i">
              {{ cluster.type }}
            </option>
          </select>
          <div class="invalid-feedback" v-if="form.type.$error">
            Please select a pre-configured clusters
          </div>
        </div>

        <div class="input-group has-validation">
          <select
            aria-label="AMI"
            class="form-select"
            :class="form.amiIndex.$error ? 'is-invalid' : ''"
            v-model="formStore.data.amiIndex"
          >
            <!-- <option disabled selected>Pre-Configured Clusters</option> -->
            <option :value="i" v-for="(ami, i) in amiList" :key="i">
              {{ ami.name }}
            </option>
          </select>
          <div class="invalid-feedback" v-if="form.amiIndex.$error">
            Please select an image
          </div>
        </div>

        <div class="text-danger mb-2">
          Customized Cluster is disabled for this tier, Please select from the 'Pre-Configured' clusters
        </div>

        <div class="input-group">
          <input
            class="form-control form-input"
            placeholder="CPU Number"
            type="text"
            v-model="formStore.data.vCPU"
            readonly
          />
        </div>

        <div class="input-group">
          <input
            class="form-control form-input"
            placeholder="RAM"
            type="text"
            v-model="formStore.data.memory"
            readonly
          />
        </div>

        <div class="input-group">
          <input
            class="form-control form-input"
            placeholder="GPU Number"
            type="text"
            v-model="formStore.data.gpus"
            readonly
          />
        </div>
      </div>

      <h5 class="titr-style">Setting</h5>

      <div class="cluster-setting-option">
        <div class="form-check tools-option">
          <input
            checked
            class="form-check-input tools-option-input"
            type="checkbox"
          />
          <label class="form-check-label"
          >Auto termination after [ ] of inactivity</label
          >
        </div>

        <div class="form-check tools-option">
          <label class="form-check-label"
          >Enable compute Auto-Scaling</label>
        </div>

        <div class="form-check tools-option">
          <input
            checked
            class="form-check-input tools-option-input"
            type="checkbox"
          />
          <label class="form-check-label"
          >Enable storage Auto-Scaling</label
          >
        </div>
      </div>
    </form>
  </div>

  <div class="btn-row">
    <button class="btn btn-style" @click="initForm">cancel</button>
    <button class="btn btn-style" @click="createCluster">Create</button>
  </div>
</template>

<script>

import { inject } from "vue";
import { useClusterFormStore } from "@/components/clusters/clusterFormStore.js";
import { useClusterStore } from "@/store/clusters.js";
import { preDefinedClusters } from "@/constants/preDefinedClusters.js"
import { amiList } from "@/constants/amiList.js"
import TextField from "@/components/common/TextField.vue";

export default {
  name: "ClusterForm",
  components: {
    TextField,
  },
  setup() {
    const formStore = useClusterFormStore()
    const clusterStore = useClusterStore()
    const toast = inject("toast")

    const createCluster = async () => {
      try {
        if (!await formStore.onSubmitClicked()) {
          return
        }
        toast.success('Successfully created!')
        await clusterStore.init()
      } catch (err) {
        toast.warning(err.message)
      }
    }

    const initForm = () => {
      formStore.initForm()
    }

    return {
      initForm,
      createCluster,
      formStore,
      form: formStore.form,
      preDefinedClusters,
      amiList
    }
  },
}
</script>