import {defineStore} from "pinia";
import SetupResultsService from "@/services/setupService.js";

export const useNewRunStore = defineStore({
    id: "newRun",
    state: () => {
        return {
            results: [],
            isLoading: true,
            error: null,
            crumbs: [
                {title: "Home", destination: {name: "Home"}},
                {title: "Run", destination: {name: "RunList"}},
                {title: "New Run", destination: {name: "NewRun"}},
            ]
        }
    },
    actions: {
        init() {
            this.getSetups()
        },
        async getSetups() {
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