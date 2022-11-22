<template>
  <div class="training-card">
    <h6 class="card-title">{{ training.title }}</h6>
    <div class="card-body">
      {{ training.descritpion }}
    </div>
    <a href="">Read More</a>
  </div>
</template>

<script>
export default {
  name: "TrainingItem",
  props: ['training'],
}
</script>

<style scoped>

</style>