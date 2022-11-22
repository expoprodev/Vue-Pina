import {defineStore} from "pinia";
import LoginService from "@/services/loginService.js";
import {useAuthStore} from "@/store/auth/auth.js";

export const useLoginStore = defineStore({
    id: "login",
    state: () => {
        return {
            data: {
                email: '',
                password: '',
            },
            isLoading: false,
            error: null,
        }
    },
    actions: {
        async login() {
            this.isLoading = true
            this.error = null
            return await LoginService.login({
                userName: this.data.email,
                password: this.data.password,
            }).then((res) => {
                console.log(res)
                this.isLoading = false
                const authStore = useAuthStore()
                authStore.login(res.data.token, res.data.firstname, res.data.lastname)
                authStore.setUser(res.data.firstname, res.data.lastname)
            }).catch(() => {
                this.isLoading = false
                this.error = "Username or password is incorrect!"
                return Promise.reject();
            })
        }
    }
});
