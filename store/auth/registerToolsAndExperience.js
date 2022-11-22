import {defineStore} from "pinia";
import {getCookie} from "@/compositions/helper/cookieHelper.js";
import {TEMP_EMAIL_COOKIE_KEY} from "@/views/auth/register/personal/registerInformation.js";
import RegisterService from "@/services/registerService.js";

export const useRegisterToolsAndExperienceStore = defineStore({
    id: "registerToolsAndExperience",
    state: () => {
        return {
            email: "",
            tools: [{
                id: 0, title: "Access to computational power", value: "atcp", isChecked: false, subOptions: [{
                    id: 1, title: "CPU", value: "cpu", isChecked: false,
                }, {
                    id: 2, title: "GPU", value: "gpu", isChecked: false,
                },],
            }, {
                id: 3, title: "Educational material", value: "em", isChecked: false, subOptions: [],
            }, {
                id: 4, title: "Helpful community", value: "hc", isChecked: false, subOptions: [],
            }, {
                id: 5, title: "Easy sharing and collaboration", value: "esac", isChecked: false, subOptions: [],
            }, {
                id: 6, title: "Easy post-processing", value: "epp", isChecked: false, subOptions: [],
            }, {
                id: 7, title: "Pipeline creation and management", value: "pcam", isChecked: false, subOptions: [],
            }, {
                id: 8, title: "Version management", value: "vm", isChecked: false, subOptions: [],
            }, {
                id: 9, title: "Other", value: "other", isChecked: false, subOptions: [],
            },],
            experiences: [{
                id: 0,
                title: "No experience, don’t have any experience with physics models",
                value: "nedhaewpm",
                isChecked: false,
                subOptions: [],
            }, {
                id: 1,
                title: "Beginner, learning about the model and its basics",
                value: "blatmaub",
                isChecked: false,
                subOptions: [],
            }, {
                id: 2,
                title: "Somewhat, know the basics and like to do more experiment",
                value: "sktbaltdme",
                isChecked: false,
                subOptions: [],
            }, {
                id: 4,
                title: "Intermediate: I know what I am doing",
                value: "iikwiam",
                isChecked: false,
                subOptions: [],
            }, {
                id: 5,
                title: "Expert: I am looking for a solution for a problem",
                value: "eialfasfap",
                isChecked: false,
                subOptions: [],
            },],
            isLoading: false,
            error: null,
        }
    },
    actions: {
        init() {
            this.email = getCookie(TEMP_EMAIL_COOKIE_KEY)
        },
        async completeRegister() {
            this.isLoading = true
            this.error = null
            const toolsToRegister = []
            const experienceToRegister = []
            this.tools.forEach(element => {
                if (element.isChecked) toolsToRegister.push(element.title)
                element.subOptions.forEach(subElement => {
                    if (subElement.isChecked) toolsToRegister.push(subElement.title)
                })
            })
            this.experiences.forEach(element => {
                if (element.isChecked) experienceToRegister.push(element.title)
            })

            return await RegisterService.complete({
                userName: this.email,
                tools: toolsToRegister,
                usages: experienceToRegister,
            })
                .then(() => {
                    this.isLoading = false
                }).catch((err) => {
                    this.isLoading = false
                    this.error = err.response.data.message
                    return Promise.reject();
                })
        }
    }
})