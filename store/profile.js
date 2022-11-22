import {defineStore} from "pinia";
import ProfileServiceApi from "@/services/profileService.js";
import {required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {useHeaderStore} from "@/store/header.js";

const rules = {
    firstname: {required: required}, lastname: {required}
}

export const useProfileStore = defineStore({
    id: "profile",

    state: () => {
        return {
            hasChanged: 0,
            data: {
                profileImage: "",
                firstname: "",
                lastname: "",
                midName: "",
                roleInCompany: "",
                company: "",
                credit: "",
                username: "",
            },
            chart: {
                chartId: "profileChart",
                traces: [{
                    x: [], y: [], z: [], mode: "scatter", type: "lines",
                }],
                layout: {
                    xaxis: "labelX",
                    yaxis: "labelY",
                },
                config: {
                    responsive: true,
                }
            },

            isLoading: true,
        }
    },
    getters: {
        form: (state) => {
            return useVuelidate(rules, state.data)
        },
    },
    actions: {

        triggerChange() {
            const store = this
            store.$patch((state) => {
                state.hasChanged = state.hasChanged + 1
            })
        },

        async onSubmitClicked() {
            const isValid = await this.form.value.$validate()
            if (!isValid) return
            await this.save()
        },
        async getProfileDetails() {
            this.isLoading = true
            const profileData = await ProfileServiceApi.getDetails()
            let chart = this.chart
            let dates = [], values = []
            let data = profileData.data;
            data.accountBalance.forEach(value => {
                dates.push(value.date)
                values.push(value.value)
            })
            chart.traces[0].x = dates
            chart.traces[0].y = values
            this.$patch({data: data})
            this.triggerChange()
            this.isLoading = false
        },
        async save() {
            this.isLoading = true
            await ProfileServiceApi.save({
                firstName: this.data.firstname,
                lastName: this.data.lastname,
                midName: this.data.midName,
                roleInCompany: this.data.roleInCompany,
                company: this.data.company,
            })
            this.isLoading = false
        },
        async getProfileImage() {
            this.isLoading = true
            const {data} = await ProfileServiceApi.getProfileImage()

            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onloadend = () => {
                this.data.profileImage = reader.result
                const headerStore = useHeaderStore()
                headerStore.$patch({profileImage: reader.result})
            }
            this.isLoading = false
        },
        async updateProfileImage(imageFile) {
            this.isLoading = true
            await ProfileServiceApi.updateProfileImage(imageFile)
            this.isLoading = false
        }
    }
});
