import {defineStore} from "pinia";
import UseClusterService from "@/services/clusterService.js";

export const useClusterStore = defineStore({
    id: "clusters",
    state: () => {
        return {
            clusters: [],
            selected: [],
            isLoading: true,
            error: null,
            crumbs: [
                {title: "Home", destination: {name: "Home"}},
                {title: "Clusters", destination: {name: "Clusters"}},
            ]
        }
    },
    getters: {
        isSelectedOne: (state) => {
            return state.selected.length == 1
        }
    },
    actions: {
        init() {
            this.$patch((state) => {
                state.clusters = []
                state.selected = []
            })

            this.getClusters()
        },
        toggleSelection(instanceId) {
            this.$patch((state) => {
                let bExisting = state.selected.some((instId) => instId == instanceId)
                if (bExisting) {
                    state.selected = state.selected.filter((instId) => instId != instanceId)
                } else {
                    state.selected = [...state.selected, instanceId]
                }
            })
        },
        async getClusters() {
            this.$patch({ isLoading: true })
            return await UseClusterService.getClusters()
                .then((res) => {
                    this.$patch((state) => {
                        state.isLoading = false
                        state.clusters = res.data
                    })
                }).catch(() => {
                    this.$patch((state) => {
                        state.isLoading = false
                        state.error = "Error"
                    })
                    return Promise.reject();
                })
        },
        selectAll() {
            if (this.selected.length == this.clusters.length) {
                this.$patch({ selected: [] })
            } else {
                this.$patch({ selected: this.clusters.map((cluster) => cluster.instanceId) })
            }
        },
        async startCluster() {
            const instanceId = this.selected[0]
            return await UseClusterService.startCluster(instanceId)
        },
        async stopCluster() {
            const instanceId = this.selected[0]
            return await UseClusterService.stopCluster(instanceId)
        },
        async terminateCluster() {
            const instanceId = this.selected[0]
            return await UseClusterService.terminateCluster(instanceId)
        },
    }
})