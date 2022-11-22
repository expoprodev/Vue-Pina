import {defineStore} from "pinia";
import ProfileServiceApi from "@/services/profileService.js";
import {useAuthStore} from "@/store/auth/auth.js";
import router from "@/router/index.js";

export const useHeaderStore = defineStore({
    id: "header",
    state: () => {
        return {
            profileImage: "",
            user: {firstname: "", lastname: ""},
            showProfileMenu: false,
        }
    },
    actions: {
        init() {
            this.getProfileImage()
            const authStore = useAuthStore()
            this.user = authStore.getUser()
        },
        onOutsideClicked() {
            this.showProfileMenu = false
        },
        async getProfileImage() {
            const {data} = await ProfileServiceApi.getProfileImage()

            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onloadend = () => {
                this.profileImage = reader.result
            }
        },
        onUserIconClicked() {
            this.showProfileMenu = !this.showProfileMenu
        },
        onLogoutClicked() {
            const authStore = useAuthStore()
            authStore.logout()
            router.push({name: "Login"})
        },
    }
})