import { defineStore } from "pinia";
import useVuelidate from "@vuelidate/core";
import { required, not } from "@vuelidate/validators";
import ClusterService from "@/services/clusterService";
import { preDefinedClusters } from "@/constants/preDefinedClusters.js"
import { amiList } from "@/constants/amiList.js"

export const useClusterFormStore = defineStore({
  id: "registerInformation",
  state: () => {
    return {
      data: {
        name: '',
        type: -1,
        amiIndex: -1,
        vCPU: '',
        memory: '',
        gpus: ''
      },
      isLoading: false,
      error: null,
    }
  },
  getters: {
    form: (state) => {
      const rules = {
        name: {required},
        type: {isValid: not(v => v == -1)},
        amiIndex: {isValid: not(v => v == -1)},
      }
      return useVuelidate(rules, state.data)
    },
  },
  actions: {
    initForm() {
      this.$patch((state) => {
        state.data.name = ''
        state.data.type = -1
        state.data.amiIndex = -1
        state.data.vCPU = ''
        state.data.memory = ''
        state.data.gpus = ''
      })
    },
    async onSubmitClicked() {
      return await this.create()
    },
    async create() {
      this.$patch((state) => {
        state.isLoading = true
        state.error = null
      })
      const isValid = await this.form.value.$validate()
      if (!isValid) {
        return false
        // return Promise.reject("The inputs are not valid");
      }
      const type = preDefinedClusters[this.data.type].type
      const imageId = amiList[this.data.amiIndex].imageId
      await ClusterService.createCluster({
        ImageId: imageId,
        InstanceType: type,
        Name: this.data.name,
      })
      return true
    },
  }
})