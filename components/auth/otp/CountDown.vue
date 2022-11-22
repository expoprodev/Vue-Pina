<template>
  <span>{{ displayedTime }}</span>
</template>

<script>
import {computed} from "vue";

export default {
  name: "CountDown",
  props: {
    modelValue: Number,
    seconds: {
      type: Number,
      default: 90,
    },
  },
  setup(props, {emit}) {
    const displayedTime = computed({
      get: () => ssf(props.modelValue),
      set: (value) => emit("update:modelValue", value),
    });

    function ssf(ssss) {
      if (ssss === 0) {
        return ""
      }
      let hours = Math.floor(ssss / 3600);
      let minutes = Math.floor((ssss - (hours * 3600)) / 60);
      let seconds = ssss - (hours * 3600) - (minutes * 60);

      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      return minutes + ':' + seconds;
    }

    return {displayedTime};
  }
}
</script>

<style scoped>

</style>