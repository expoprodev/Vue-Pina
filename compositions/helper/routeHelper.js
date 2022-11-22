import router from "@/router";

export function isOnRoute(routeName) {
    return router.currentRoute.value.name === routeName
}


