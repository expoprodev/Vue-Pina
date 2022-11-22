import {defineStore} from "pinia";
import HomeService from "@/services/homeService.js";

export const useHomeStore = defineStore({
    id: "home",
    state: () => {
        return {
            data: {
                training: [],
                setups: [],
                accountBalance: [],
                news: [],
                questions: [],
            },
            isLoading: false,
            error: null,
        }
    },
    actions: {
        init() {
            this.getHomeDetails()
        },
        getHomeDetails() {
            this.isLoading = true
            this.error = null
            HomeService.getHomeDetails()
                .then((res) => {
                    this.$patch({data: res.data})
                    this.isLoading = false
                }).catch((err) => {
                if (err.response)
                    this.error.value = err.response.data
                this.isLoading = false
            })
        }
    }
});
