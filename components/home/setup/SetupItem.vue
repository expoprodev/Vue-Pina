<template>
  <div class="setup-card">
    <div class="expand-screen">
      <img alt="" src="~@/assets/img/path_62.png"/>
    </div>
    <div class="setup-img">
      <router-link :to="{name:onClickDestination,params: { modelName: setup.modelName }}">
        <img :src="setup.imageUrl" alt=""/>
      </router-link>
    </div>
    <div class="setup-info">
      <h6>{{ setup.name }}</h6>
      <div class="bottom-card">
        <span>
          <i class="fal fa-clock"></i>
          {{ count }} Days ago
        </span>
        <span>
          <i class="fa fa-eye"></i>
          {{ setup.viewCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  name: "SetupItem",
  props: {
    setup: Object,
    onClickDestination: {
      type: String,
      default: 'SetupResultDetail',
    }
  },
  setup(props) {
    const count = computed(() => {
      let day = 1000 * 60 * 60 * 24;
      let date1 = new Date(props.setup.date);
      let date2 = new Date();
      let timeDiff = date2 - date1;
      return Math.floor(timeDiff / day);
    })

    return {count}
  }
}
</script>

<style scoped>

</style>