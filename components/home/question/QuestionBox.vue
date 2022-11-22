<template>
  <div class="news-item">
    <div class="news-header ques-header">
      Questions
      <div class="ask">Ask a question !</div>
    </div>
    <div class="news-content">
      <QuestionItem v-for="question in questions" :key="question.id" :question="question"/>
    </div>
  </div>
</template>

<script>
import QuestionItem from "@/components/home/question/QuestionItem.vue";

export default {
  name: "QuestionBox",
  components: {QuestionItem},
  props: {
    questions: Array,
  },
}
</script>

<style scoped>

</style>