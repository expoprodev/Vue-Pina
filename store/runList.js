import {defineStore} from "pinia";
import SetupResultsService from "@/services/setupService.js";

export const useRunListStore = defineStore({
    id: "runList",
    state: () => {
        return {
            results: [],
            isLoading: true,
            error: null,
            crumbs: [
                {title: "Home", destination: {name: "Home"}},
                {title: "Run", destination: {name: "RunList"}},
            ]
        }
    },
    actions: {
        init() {
            this.getRuns()
        },
        async getRuns() {
            this.isLoading = true
            return await SetupResultsService.getSetups(0, 20)
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
