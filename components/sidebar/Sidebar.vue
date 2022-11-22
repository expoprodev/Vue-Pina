<template>
  <aside ref="sidebar" v-click-outside="onOutsideClicked" class="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <img alt="" class="img-fluid logo-lg" src="~@/assets/img/logo.png"/>
        <img
            alt=""
            class="img-fluid logo-sm"
            src="~@/assets/img/logo_minsize.png"
        />
      </div>
      <div class="sidebar-brand">Digital Physics</div>
    </div>
    <!--  -->
    <div class="sidebar-body">
      <ul>

        <SidebarItem
            :is-active="isOnRoute('Home')|| isOnRoute('Profile')"
            destination="Home"
            icon="fal fa-home" title="Home"/>

        <AccordionSidebarItem :children="simulationItems"
                              :is-active="isOnRoute('Home1')"
                              icon="fal fa-sliders-h"
                              item-id:="mainMenu" title="Simulation"/>

        <SidebarItem :is-active="isOnRoute('SetupResultDetail') || isOnRoute('SetupResultsList')"
                     destination="SetupResultsList"
                     icon="fal fa-chart-bar" title="Result"/>

        <SidebarItem :has-divider="true"
                     :is-active="isOnRoute('Home1')"
                     destination="Home" icon="fal fa-file" title="Notebook"/>

        <SidebarItem :is-active="isOnRoute('Clusters')"
                     destination="Clusters"
                     :icon="ClusterIcon"
                     title="Clusters"
                     :isFontIcon="false"/>

        <SidebarItem :is-active="isOnRoute('Home1')"
                     destination="Home"
                     icon="fal fa-cog" title="Systems"/>

      </ul>
    </div>
  </aside>
</template>

<script>
import SidebarItem from "@/components/sidebar/SidebarItem.vue";
import {isOnRoute} from "@/compositions/helper/routeHelper";
import AccordionSidebarItem from "@/components/sidebar/AccordionSidebarItem.vue";
import ClusterIcon from '@/components/clusters/ClusterIcon.vue'
import {ref} from "vue";

export default {
  name: "Sidebar",
  components: {AccordionSidebarItem, SidebarItem},
  setup() {
    const sidebar = ref()
    const simulationItems = ref([
      {
        icon: "fas fa-circle",
        title: "New simulation",
        destination: "",
        secondDestination: "",
      },
      {
        icon: "fas fa-circle",
        title: "Open setup",
        destination: "",
        secondDestination: "",
      },
      {
        icon: "fas fa-circle",
        title: "Run",
        destination: "RunList",
        secondDestination: "NewRun",
      }
    ]);
    const onOutsideClicked = () => {
      if (sidebar.value.classList.contains("fixed-sidebar")) {
        sidebar.value.classList.remove("fixed-sidebar")
      }
    }

    return {isOnRoute, simulationItems, ClusterIcon, onOutsideClicked, sidebar}
  }
}
</script>

<style scoped>

</style>