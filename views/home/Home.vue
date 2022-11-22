<template>
      <div class="main-content">
        <div class="top-content">
          <div class="w-max-1600">
            <div class="notification">
              You have <span>14</span> new notifications
            </div>
            <div class="welcome-header">
              <h5>Welcome to DiPhyx</h5>
              <div class="version-update">What's new in V 0.027</div>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </p>

            <TrainingBox :trainings="data.training"/>

          </div>
        </div>
        <div class="w-max-1600">
          <div class="main-tools">

            <SetupBox :setups="data.setups"/>

            <AccountBalanceBox :accountBalance="data.accountBalance"/>

            <div class="news">

              <QuestionBox :questions="data.questions"/>

              <NewsBox :news="data.news"/>

            </div>
          </div>
        </div>
      </div>
</template>

<script>
import TrainingBox from "@/components/home/training/TrainingBox.vue";
import SetupBox from "@/components/home/setup/SetupBox.vue";
import QuestionBox from "@/components/home/question/QuestionBox.vue";
import NewsBox from "@/components/home/new/NewsBox.vue";
import AccountBalanceBox from "@/components/home/balance/AccountBalanceBox.vue";
import {useHomeStore} from "@/store/home.js";

export default {
  name: 'Home',
  components: {
    NewsBox,
    QuestionBox,
    SetupBox,
    TrainingBox,
    AccountBalanceBox,
  },
  setup() {
    const store = useHomeStore()
    store.init()

    return {
      data: store.data,
    }
  }
}
</script>

<style scoped>

</style>
