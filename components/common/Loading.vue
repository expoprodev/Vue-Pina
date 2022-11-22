<template>
  <Vue3Lottie v-if="loading" :animationData="animationData" :height="60" :width="60"/>
</template>

<script>
import animationData from '../../assets/anim/blue_anim'
import {Vue3Lottie} from "vue3-lottie";


export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean,
      default: true,
    }
  },
  components: {Vue3Lottie},
  setup() {
    return {
      animationData,
    }
  },
}
</script>
