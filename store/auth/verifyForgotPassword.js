import {defineStore} from "pinia";
import ForgotPasswordService from "@/services/forgotPasswordService.js";
import {getCookie} from "@/compositions/helper/cookieHelper.js";
import {TEMP_EMAIL_FORGOT_PASSWORD_COOKIE_KEY} from "@/store/auth/forgotPassword.js";

export const useVerifyForgotPasswordStore = defineStore({
    id: "verifyForgotPassword",
    state: () => {
        return {
            email: "",
            otpInput: "",
            isLoading: false,
            error: null,
            resetButtonDisable: true,
            timer: null,
            timerSeconds: 90,
        }
    },
    actions: {
        init() {
            this.isLoading = false
            this.error = null
            this.email = getCookie(TEMP_EMAIL_FORGOT_PASSWORD_COOKIE_KEY)
            this.startTimer()
        },
        startTimer() {
            this.timerSeconds = 90
            this.timer = setInterval(this.timerOperation, 1000)
        },
        timerOperation() {
            this.timerSeconds -= 1
            if (this.timerSeconds < 1) {
                this.resetButtonDisable = false
                clearInterval(this.timer);
            }
        },
        async verify() {
            this.isLoading = true
            this.error = null
            if (this.otpInput.length < 5) {
                this.error = "Please Enter Confirmation Code"
                this.otpInput = ""
                this.isLoading = false
                return await Promise.reject();
            }
            return await ForgotPasswordService.verifyOtpCode({
                userName: this.email, code: this.otpInput,
            })
                .then(() => {
                    this.isLoading = false
                }).catch((err) => {
                    this.otpInput = ""
                    this.isLoading = false
                    this.error = err.response.data.message
                    return Promise.reject();
                })
        },
        async resendCode() {
            this.isLoading = true
            this.error = null
            this.resetButtonDisable = true
            this.otpInput = ""
            return await ForgotPasswordService.resendOtpCode({userName: this.email})
                .then(() => {
                    this.startTimer()
                    this.isLoading = false
                }).catch((err) => {
                    this.error = err.response.data.message
                    this.resetButtonDisable = false
                    this.isLoading = false
                })
        }
    }
})