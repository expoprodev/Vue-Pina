<template>
    <li :class="{'active':isActive,'side-border':hasDivider}">
      <router-link :to="{name:destination}">
      <i v-if="isFontIcon" :class="icon"></i>
      <component v-else :is="icon"/>
      <span>{{ title }}</span>
      </router-link>
    </li>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    title: {String},
    isActive: Boolean,
    destination: {
      type: String,
      default: "Home",
    },
    icon: {
      type: [String, Object],
      required: true,
    },
    hasDivider: {
      type: Boolean,
      default: false,
    },
    isFontIcon: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<style scoped>

</style>