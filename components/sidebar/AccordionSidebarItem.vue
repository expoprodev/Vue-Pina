<template>
  <div :id="itemId" class="accordion">
    <div class="accordion-content">
      <li>
        <a
            class="accordion-link"
            data-bs-target="#subMenu"
            data-bs-toggle="collapse"
            href=""
            type="button"
        ><i :class="icon" class="fal"></i> <span>{{ title }}</span>
          <span class="open-icon"
          ><i class="fal fa-angle-down"></i
          ></span>
        </a>
      </li>
      <div
          id="subMenu"
          :data-bs-parent="`#${itemId}`"
          aria-labelledby="headingOne"
          class="accordion-collapse collapse"
      >
        <SidebarItem v-for="(child,index) in children" :key="index"
                     :destination="child.destination"
                     :icon="child.icon"
                     :is-active="isOnRoute(child.destination) || isOnRoute(child.secondDestination)"
                     :title="child.title"/>
      </div>
    </div>
  </div>
</template>

<script>

import SidebarItem from "@/components/sidebar/SidebarItem.vue";
import {isOnRoute} from "@/compositions/helper/routeHelper.js";

export default {
  name: "AccordionSidebarItem",
  components: {SidebarItem},
  props: {
    itemId: {String},
    title: {String},
    icon: String,
    children: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {isOnRoute}
  }
}
</script>
