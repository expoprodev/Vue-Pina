<template>
  <div class="news-li">
    {{ news.title }}
    <a href="">See Answers</a>
  </div>
</template>

<script>
export default {
  name: "NewsItem",
  props: ['news'],
}
</script>

<style scoped>

</style>