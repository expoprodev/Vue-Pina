<template>
  <nav id="header-breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <breadcrumb-item v-for="(crumb, ci) in crumbs" :key="ci" :class="{ active: isOnRoute(crumb.route) }"
                       :destination="crumb.destination" :is-active="isOnRoute(crumb.route)" :title="crumb.title">
      </breadcrumb-item>
    </ol>
  </nav>
</template>

<script>
import {isOnRoute} from "@/compositions/helper/routeHelper.js";
import BreadcrumbItem from "@/components/navbar/BreadcrumbItem.vue";

export default {
  name: "NavBar",
  components: {BreadcrumbItem},
  props: {
    crumbs: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {isOnRoute}
  }
}
</script>