<template>
  <div class="training">
    <div class="setup-header">
      <h6>Trainings</h6>
      <a class="more" href="">
        See all of our trainings
        <i class="fal fa-angle-right"></i>
      </a>
    </div>
    <div class="training-content">
      <TrainingItem v-for="training in trainings" :key="training.id" :training="training"/>
    </div>
    <small>Dismiss this section</small>
  </div>
</template>

<script>
import TrainingItem from "@/components/home/training/TrainingItem.vue";

export default {
  name: "TrainingBox",
  components: {TrainingItem},
  props: {
    trainings: Array,
  }
}
</script>

<style scoped>

</style>