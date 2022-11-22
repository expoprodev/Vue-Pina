<template>
  <div class="input-group has-validation">
    <input v-model="textFieldComponentModel"
      :placeholder="placeHolder"
      :type="type"
      class="form-control form-input"
      v-bind:class="{ 'is-invalid': hasError}"
      @blur="showSlot = false"
      @focus="showSlot = true"
    >

    <slot v-if="showSlot"></slot>

    <div v-for="error of errors" :key="error.$uid" class="invalid-feedback">
      {{ error.$message }}
    </div>

  </div>
</template>

<script>
import {computed, ref} from 'vue';

export default {
  name: "TextField",
  props: {
    placeHolder: String,
    type: {
      type: String,
      default: 'text',
    },
    modelValue: String,
    hasError: Boolean,
    errors: Array,
  },
  setup(props, {emit}) {
    const textFieldComponentModel = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const showSlot = ref(false)

    return {textFieldComponentModel, showSlot}
  }
}
</script>

<style scoped>

</style>