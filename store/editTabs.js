import {defineStore} from "pinia";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useSetupResultStore} from "@/store/setupResultStore.js";

const rules = {
    tab1: {required},
    tab2: {required},
    tab3: {required},
    tab4: {required},
}

export const useEditTabsStore = defineStore({
    id: "editTabs",
    state: () => {
        return {
            data: {
                tab1: '',
                tab2: '',
                tab3: '',
                tab4: '',
            },
        }
    },
    getters: {
        form: (state) => {
            return useVuelidate(rules, state.data)
        },
    },
    actions: {
        init() {
            const resultStore = useSetupResultStore()
            this.data.tab1 = resultStore.tabs[0].label
            this.data.tab2 = resultStore.tabs[1].label
            this.data.tab3 = resultStore.tabs[2].label
            this.data.tab4 = resultStore.tabs[3].label
        },
        async saveTabs() {
            const isValid = await this.form.value.$validate()
            if (!isValid) {
                return await Promise.reject();
            }
            const resultStore = useSetupResultStore()
            resultStore.saveTabsNames([
                this.data.tab1,
                this.data.tab2,
                this.data.tab3,
                this.data.tab4,
            ])
        },
    }
})