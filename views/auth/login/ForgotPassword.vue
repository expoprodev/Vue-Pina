<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row h-100vh">

        <DescriptionPanel>
          We can say something about
          <span>Digital Physics</span> here, and add a graphical element to show how CFD works.
        </DescriptionPanel>

        <div class="col-lg-6 h-100vh gx-0">
          <div class="forgot-content h-100vh d-flex justify-content-center flex-column">
            <div class="title">Forgot Password</div>
            <h6 class="forgot-text">Enter the Email address associated with your account</h6>
            <form action="" @submit.prevent="onNextClicked">
              <TextField
                  v-model="store.data.email"
                  :errors="form.email.$errors"
                  :has-error="form.email.$error"
                  place-holder="Email"
                  type="email"
              />

              <TextError :error="store.error"/>

              <Button :disabled="store.isLoading" text="Next"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DescriptionPanel from "@/components/auth/DescriptionPanel.vue";
import router from "@/router";
import Button from "@/components/common/Button.vue";
import TextField from "@/components/common/TextField.vue";
import TextError from "@/components/common/TextError.vue";
import {useForgotPasswordStore} from "@/store/auth/forgotPassword.js";

export default {
  name: 'ForgotPassword',
  components: {
    TextError,
    Button,
    TextField,
    DescriptionPanel,
  },
  setup() {
    const store = useForgotPasswordStore()

    const onNextClicked = () => {
      store.forgot().then(() => {
        router.push({name: "VerifyForgotPassword"})
      }).catch(() => {
      })
    }

    return {
      store,
      onNextClicked,
      form: store.form,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
