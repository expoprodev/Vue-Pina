import {defineStore} from "pinia";
import {getCookie} from "@/compositions/helper/cookieHelper.js";
import RegisterService from "@/services/registerService.js";
import {TEMP_EMAIL_COOKIE_KEY} from "@/views/auth/register/personal/registerInformation.js";

export const useVerifyRegisterStore = defineStore({
    id: "verifyRegister",
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
            this.email = getCookie(TEMP_EMAIL_COOKIE_KEY)
            this.startTimer()
        },
        startTimer() {
            if (this.timer)
                clearInterval(this.timer);
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
            return await RegisterService.verifyOtpCode({
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
            return await RegisterService.resendOtpCode({userName: this.email})
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