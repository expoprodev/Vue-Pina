<template>
  <li :class="{ active: isActive }" class="breadcrumb-item">
    <router-link :to="destination">{{ title }}</router-link>
  </li>
</template>

<script>
export default {
  name: "BreadcrumbItem",
  props: {
    title: {String},
    isActive: Boolean,
    destination: {
      type: Object,
    },
  }
}
</script>