<template>
  <div class="main-header">
    <div class="burger-menu" @click="onBurgerMenuClicked">
      <i class="far fa-bars"></i>
    </div>
    <div class="back-icon">
      <router-link v-if="parentRoute" :to="parentRoute"><i class="far fa-angle-left"></i></router-link>
    </div>
    <ul v-click-outside="store.onOutsideClicked" class="main-menu">
      <li><i class="fal fa-search"></i></li>
      <li><i class="fal fa-bell"></i></li>
      <li><i class="fas fa-question-circle"></i></li>
      <li>
        <div class="user-icon" @click="store.onUserIconClicked">
          <img
              :src="profileImage"
              alt=""
              class="rounded-circle"
          />
        </div>
      </li>
      <div v-show="store.showProfileMenu" class="user-profile-menu" @mouseleave="store.onOutsideClicked">
        <ul>
          <li>
            <router-link :to="{name:'Profile'}">
              <div class="profile-icon"><i class="far fa-user"></i></div>
              <div class="profile-text">{{ store.user.firstname + " " + store.user.lastname }}</div>
            </router-link>
          </li>

          <li>
            <router-link :to="{name:'Profile'}" @onclick="store.onOutsideClicked">
              <div class="profile-icon">
                <i class="fal fa-id-card-alt"></i>
              </div>
              <div class="profile-text">
                Profile Page
              </div>
            </router-link>
          </li>
          <li>
            <a href="#">
              <div class="profile-icon">
                <i class="far fa-angle-left"></i>
              </div>
              <div class="profile-text" @click="store.onLogoutClicked">Logout</div>
            </a>
          </li>
        </ul>
      </div>
    </ul>
  </div>
</template>

<script>
import {useHeaderStore} from "@/store/header.js";
import {computed, ref, watch} from "vue";
import profilePlaceHolder from "../../assets/img/user_profile.jpg";
import router from "@/router/index.js";

export default {
  name: "MainHeader",
  setup() {
    const store = useHeaderStore()
    store.init()
    let parentRoute = ref()
    watch(router.currentRoute, (value) => {
      if (!value.matched[0] || value.matched[0].path !== value.path)
        parentRoute.value = {path: value.matched[0].path}
      else {
        parentRoute.value = {name: "Home"}
      }
    })
    const profileImage = computed(() => {
      if (store.profileImage) {
        return store.profileImage
      } else {
        return profilePlaceHolder
      }
    })
    const onBurgerMenuClicked = () => {
      var element = document.querySelector(".sidebar");
      element.classList.toggle("fixed-sidebar");
    }

    return {store, profileImage, parentRoute, onBurgerMenuClicked}
  }
}
</script>

<style scoped>

</style>