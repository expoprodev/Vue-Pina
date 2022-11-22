<template>
  <div class="news-li">
    {{ question.title }}
    <a href="">See Answers</a>
  </div>
</template>

<script>
export default {
  name: "QuestionItem",
  props: ['question'],
}
</script>

<style scoped>

</style>