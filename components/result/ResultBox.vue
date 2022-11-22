<template>
  <div class="runs">
    <div class="run-content">
      <ResultItem v-for="result in results" :key="result.id" :result="result"/>
    </div>
  </div>
</template>

<script>
import ResultItem from "@/components/result/ResultItem.vue";

export default {
  name: "ResultBox",
  components: {
    ResultItem,
  },
  props: {
    results: Array,
  },
}
</script>

<style scoped>

</style>