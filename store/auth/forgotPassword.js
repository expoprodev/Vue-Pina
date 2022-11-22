import {email, required} from "@vuelidate/validators";
import {defineStore} from "pinia";
import useVuelidate from "@vuelidate/core";
import ForgotPasswordService from "@/services/forgotPasswordService.js";
import {setCookie} from "@/compositions/helper/cookieHelper.js";

export const TEMP_EMAIL_FORGOT_PASSWORD_COOKIE_KEY = "tempMailForgotPassword"

const rules = {
    email: {
        required, email
    }
}

export const useForgotPasswordStore = defineStore({
    id: "forgotPassword",
    state: () => {
        return {
            data: {
                email: "",
            },
            isLoading: false,
            error: null,
        }
    },
    getters: {
        form: (state) => {
            return useVuelidate(rules, state.data)
        },
    },
    actions: {
        async forgot() {
            this.isLoading = true
            this.error = null
            const isValid = await this.form.value.$validate()
            if (!isValid) {
                this.isLoading = false
                return await Promise.reject();
            }
            return await ForgotPasswordService.forgot({
                userName: this.data.email
            })
                .then(() => {
                    this.isLoading = false
                    setCookie(TEMP_EMAIL_FORGOT_PASSWORD_COOKIE_KEY, this.data.email, 5)
                }).catch((err) => {
                    this.isLoading = false
                    this.error = err.response.data.message
                    return Promise.reject();
                })
        },
    }
})