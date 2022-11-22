<template>
  <div v-if="error" class="input-group">
    {{ error }}
  </div>
</template>

<script>
export default {
  name: "TextError",
  props: {
    error: {
      type: String,
      default: null,
    },
  }
}
</script>

<style scoped>

</style>