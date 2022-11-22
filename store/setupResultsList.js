import {defineStore} from "pinia";
import UseSetupService from "@/services/setupService.js";

export const useSetupResultListStore = defineStore({
    id: "setupResultsList",
    state: () => {
        return {
            results: [],
            isLoading: true,
            error: null,
            crumbs: [
                {title: "Home", destination: {name: "Home"}},
                {title: "Results", destination: {name: "SetupResultsList"}},
            ]
        }
    },
    actions: {
        init() {
            this.getResults()
        },
        async getResults() {
            this.isLoading = true
            return await UseSetupService.getSetups(0, 20)
                .then((res) => {
                    this.isLoading = false
                    this.results = res.data.setups
                }).catch(() => {
                    this.isLoading = false
                    this.error = "Error"
                    return Promise.reject();
                })
        }
    }
})
