<template>
  <div class="news-item">
    <div class="news-header">Recent news</div>
    <div class="news-content">
      <NewsItem v-for="newItem in news" :key="newItem.id" :news="newItem"/>
    </div>
  </div>
</template>

<script>
import NewsItem from "@/components/home/new/NewsItem.vue";

export default {
  name: "NewsBox",
  components: {NewsItem},
  props: {
    news: Array,
  },
}
</script>

<style scoped>

</style>