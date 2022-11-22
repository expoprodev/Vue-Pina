import {createRouter, createWebHistory} from "vue-router";

// Authentication
import Login from "../views/auth/login/home/Login.vue";
import Landing from "../views/landing/Landing.vue";

import ForgotPassword from "../views/auth/login/ForgotPassword.vue";
import VerifyForgotPassword from "../views/auth/login/VerifyForgotPassword.vue";
import ChangePassword from "../views/auth/login/ChangePassword.vue";

import RegisterInformation from "../views/auth/register/personal/RegisterInformation.vue";
import VerifyRegister from "../views/auth/register/VerifyRegister.vue";
import RegisterTools from "../views/auth/register/RegisterTools.vue";
import RegisterExperience from "../views/auth/register/RegisterExperience.vue";

import Home from "../views/home/Home.vue";
import Profile from "../views/auth/profile/Profile.vue";
import SetupResultDetail from "../views/result/SetupResultDetail.vue";
import ImageCropper from "@/components/profile/ImageCropper.vue";
import {i18n} from "../i18n";
import SetupResultsList from "@/views/result/SetupResultsList.vue";
import EmptyRouterView from "@/EmptyRouterView.vue";
import RunList from "@/views/run/RunList.vue";
import NewRun from "@/views/run/NewRun.vue";
import Clusters from "@/views/clusters/Clusters.vue";

const {t} = i18n.global

const routes =
    [
        {
            path: "/",
            name: "landing-page",
            component: Landing,
            meta: {title: t("project-title"), needAuthentication: false, showSideBar: false}
        },
        {
            path: "/home",
            name: "Home",
            component: Home,
            meta: {title: t("dashboard"), needAuthentication: true}
        },
        {
            path: "/auth/login",
            name: "Login",
            component: Login,
            meta: {title: t("login"), needAuthentication: false, showSideBar: false}
        },
        {
            path: "/results",
            component: EmptyRouterView,
            meta: {title: t("results-list")},
            children: [
                {
                    path: "",
                    name: "SetupResultsList",
                    component: SetupResultsList,
                    meta: {title: t("results-list")},
                },
                {
                    path: "/results/:modelName",
                    name: "SetupResultDetail",
                    component: SetupResultDetail,
                    meta: {title: t("result")},
                }
            ]
        },
        {
            path: "/run",
            name: "RunList",
            component: RunList,
            meta: {title: t("run")},
        },
        {
            path: "/run/new",
            name: "NewRun",
            component: NewRun,
            meta: {title: t("new-run")},
        },
        {
            path: "/user/profile",
            name: "Profile",
            component: Profile,
            meta: {title: t("profile")}
        },
        {
            path: "/user/profile/profile-image",
            name: "Profile Image",
            component: ImageCropper,
            meta: {title: t("profile")}
        },
        {
            path: "/auth/forgot-password",
            name: "ForgotPassword",
            component: ForgotPassword,
            meta: {title: t("forget-password"), needAuthentication: false, showSideBar: false}
        },
        {
            path: "/auth/forgot-password/verify",
            name: "VerifyForgotPassword",
            component: VerifyForgotPassword,
            meta: {title: t("verify-forgot-password"), needAuthentication: false, showSideBar: false}
        },
        {
            path: "/auth/forgot-password/change",
            name: "ChangePassword",
            component: ChangePassword,
            meta: {title: t("change-password"), needAuthentication: false, showSideBar: false}
        },
        {
            path: "/auth/register/information",
            name: "RegisterInformation",
            component: RegisterInformation,
            meta: {title: t("register-information"), needAuthentication: false, showSideBar: false}
        },
        {
            path: "/auth/register/verify",
            name: "VerifyRegister",
            component: VerifyRegister,
            meta: {title: t("verify-register"), needAuthentication: false, showSideBar: false}
        },
        {
            path: "/auth/register/tools",
            name: "RegisterTools",
            component: RegisterTools,
            meta: {title: t("register-tools"), needAuthentication: false, showSideBar: false}
        },
        {
            path: "/auth/register/experience",
            name: "RegisterExperience",
            component: RegisterExperience,
            meta: {title: t("register-experience"), needAuthentication: false, showSideBar: false}
        },
        {
            path: "/clusters",
            name: "Clusters",
            component: Clusters,
            meta: {title: t("clusters")}
        },

    ];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

const DEFAULT_TITLE = t("project-title");
router.beforeEach((to) => {
    document.title = (DEFAULT_TITLE + " | " + to.meta.title) || DEFAULT_TITLE;
});

export default router;
