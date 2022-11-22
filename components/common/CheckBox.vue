<template>
  <div class="form-check tools-option">
    <input :id="value" v-model="checkBoxComponentModel" class="form-check-input tools-option-input" type="checkbox">
    <label :for="value" class="form-check-label">
      <slot></slot>
    </label>
  </div>
  <div></div>
</template>

<script>
import {computed} from "vue";

export default {
  name: "CheckBox",
  props: {
    modelValue: Boolean,
    text: String,
    value: String,
  },
  setup(props, {emit}) {
    const checkBoxComponentModel = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return {checkBoxComponentModel}
  }
}
</script>

<style scoped>

</style>