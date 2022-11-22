import {defineStore} from "pinia";
import {setCookie} from "@/compositions/helper/cookieHelper.js";
import RegisterService from "@/services/registerService.js";

export const TEMP_EMAIL_COOKIE_KEY = "tempMail"

export const useRegisterInformationStore = defineStore({
    id: "registerInformation",
    state: () => {
        return {
            data: {
                email: '',
                password: '',
                repeatPassword: '',
                firstName: '',
                lastName: '',
                company: '',
                role: '',
            },
            isLoading: false,
            error: null,
        }
    },
    actions: {
        async register() {
            this.isLoading = true
            this.error = null
            return await RegisterService.registerInformation({
                userName: this.data.email,
                password: this.data.password,
                firstname: this.data.firstName,
                lastname: this.data.lastName,
                company: this.data.company,
                roleInCompany: this.data.role,
            })
                .then(() => {
                    this.isLoading = false
                    setCookie(TEMP_EMAIL_COOKIE_KEY, this.data.email, 30)
                }).catch((err) => {
                    this.isLoading = false
                    this.error = err.response.data.message
                    return Promise.reject(err);
                })
        },
    }
})