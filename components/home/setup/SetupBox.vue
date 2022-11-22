<template>
  <div class="main-setup">
    <div class="setup-header">
      <h6>Your Recent Setup</h6>
      <router-link :to="{name:'SetupResultsList'}" class="more">
        See all
        <i class="fal fa-angle-right"></i>
      </router-link>

    </div>
    <div class="setup-content">
      <SetupItem v-for="setup in setups" :key="setup.id" :setup="setup"/>
    </div>
  </div>
</template>

<script>
import SetupItem from "@/components/home/setup/SetupItem.vue";

export default {
  name: "SetupBox",
  components: {SetupItem},
  props: {
    setups: Array,
  }
}
</script>

<style scoped>

</style>