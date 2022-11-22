<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row h-100vh">
        <DescriptionPanel>
          We can say something about
          <span>Digital Physics</span> here, and add a graphical element to show how CFD works.
        </DescriptionPanel>
        <div class="col-lg-6 h-100vh gx-0">
          <div class="tools-content h-100vh d-flex justify-content-center flex-column py-30">
            <div class="title">What tools do you need to make your physics model useful for you?</div>
            <form v-on:submit.prevent="onNextClick">

              <CheckBoxContainer v-model="store.tools"/>

              <div class="btn-container">
                <Button text="Next"/>
                <Button :is-next-button="false" text="Back" type="button" @click="onPrevClick"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import DescriptionPanel from "@/components/auth/DescriptionPanel.vue";
import Button from "@/components/common/Button.vue";
import CheckBoxContainer from "@/components/common/CheckBoxContainer.vue";
import {onMounted} from "vue";
import {useRegisterToolsAndExperienceStore} from "@/store/auth/registerToolsAndExperience.js";

export default {
  name: 'RegisterTools',
  components: {
    CheckBoxContainer,
    Button,
    DescriptionPanel
  },
  setup() {
    const store = useRegisterToolsAndExperienceStore()
    store.init()

    onMounted(() => {
      if (!store.email) {
        return router.push({name: "RegisterInformation"});
      }
    })

    const onNextClick = () => {
      router.push({name: "RegisterExperience"})
    }

    const onPrevClick = () => {
      router.go(-1)
    }

    return {
      store,
      onNextClick,
      onPrevClick,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
