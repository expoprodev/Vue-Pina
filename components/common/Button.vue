<template>
  <button
      :class="{
        'next-btn': isNextButton,
        'back-btn':!isNextButton,
      }"
      :disabled="disabled"
      :type="type"
      class="btn"
  >{{ text }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'submit',
    },
    disabled: Boolean,
    isNextButton: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped>

</style>