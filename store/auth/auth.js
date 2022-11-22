import {defineStore} from "pinia";
import axios from "axios";

const TOKEN_KEY = "token"
const FIRST_NAME_KEY = "first_name"
const LAST_NAME_KEY = "last_name"

export const useAuthStore = defineStore({
    id: "auth",
    state: () => {
        return {
            isUserLoggedIn: false,
        }
    },
    actions: {
        init() {
            const token = localStorage.getItem(TOKEN_KEY)
            if (token) {
                this.login(token)
            }
        },
        login(token) {
            this.isUserLoggedIn = true
            localStorage.setItem(TOKEN_KEY, token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        },
        setUser(firstname, lastname) {
            localStorage.setItem(FIRST_NAME_KEY, firstname)
            localStorage.setItem(LAST_NAME_KEY, lastname)
        },
        getUser() {
            return {firstname: localStorage.getItem(FIRST_NAME_KEY), lastname: localStorage.getItem(LAST_NAME_KEY)}
        },
        logout() {
            this.isUserLoggedIn = false
            localStorage.setItem(TOKEN_KEY, null)
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(FIRST_NAME_KEY)
            localStorage.removeItem(LAST_NAME_KEY)
            delete axios.defaults.headers.common['Authorization']
        }
    }
});
