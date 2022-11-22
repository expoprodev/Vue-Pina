<template>
  <div class="filter-search">
    <input
        class="form-control form-input"
        placeholder="Search"
        type="text"
    />
    <span> <i class="far fa-search"></i></span>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  name: "SearchField",
  props: {
    modelValue: String,
  },
  setup(props, {emit}) {
    const textFieldComponentModel = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return {textFieldComponentModel}
  }
}
</script>

<style scoped>

</style>