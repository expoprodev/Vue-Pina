import {helpers, minLength, required, sameAs} from "@vuelidate/validators";
import {defineStore} from "pinia";
import useVuelidate from "@vuelidate/core";
import ForgotPasswordService from "@/services/forgotPasswordService.js";
import {passwordValidator} from "@/compositions/helper/validationHelper.js";
import {getCookie} from "@/compositions/helper/cookieHelper.js";
import {TEMP_EMAIL_FORGOT_PASSWORD_COOKIE_KEY} from "@/store/auth/forgotPassword.js";

export const useChangePasswordStore = defineStore({
    id: "changePassword",
    state: () => {
        return {
            data: {
                password: "",
                passwordConfirmation: "",
            },
            email: "",
            isLoading: false,
            error: null,
        }
    },
    getters: {
        form: (state) => {
            const rules = {
                password: {
                    required: required,
                    minLength: minLength(8),
                    validator: helpers.withMessage('Must have at least one uppercase letter, one lowercase letter and one number', passwordValidator)
                },
                passwordConfirmation: {required: required, sameAsPassword: sameAs(state.data.password)},
            }

            return useVuelidate(rules, state.data)
        },
    },
    actions: {
        init() {
            this.isLoading = false
            this.error = null
            this.email = getCookie(TEMP_EMAIL_FORGOT_PASSWORD_COOKIE_KEY)
        },
        async changePassword() {
            this.isLoading = true
            this.error = null
            const isValid = await this.form.value.$validate()
            if (!isValid) {
                this.isLoading = false
                return await Promise.reject();
            }
            return await ForgotPasswordService.changePassword({
                userName: this.email, password: this.data.password,
            })
                .then(() => {
                    this.isLoading = false
                }).catch((err) => {
                    this.isLoading = false
                    this.error = err.response.data.message
                    return Promise.reject();
                })
        },
    }
})