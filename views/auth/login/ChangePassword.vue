<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row h-100vh">

        <DescriptionPanel>
          We can say something about
          <span>Digital Physics</span> here, and add a graphical element to show how CFD works
        </DescriptionPanel>

        <div class="col-lg-6 h-100vh gx-0">
          <div class="change-password-content h-100vh d-flex justify-content-center flex-column py-30">
            <div class="title">Change Password</div>
            <h6 class="forgot-text">Enter the Email address associated with your account</h6>
            <form @submit.prevent="onSubmitClicked">
              <TextField
                  v-model="store.data.password"
                  :errors="form.password.$errors"
                  :has-error="form.password.$error"
                  place-holder="New Password"
                  type="password"
              >
                <div class="password-details" style="display: flex;z-index: 1">
                  <div class="password-details-item">
                    <i class="fas fa-triangle"></i>8 Character long
                  </div>
                  <div class="password-details-item">
                    <i class="fas fa-triangle"></i>Uppercase letter
                  </div>
                  <div class="password-details-item">
                    <i class="fas fa-circle"></i>Lowercase letter
                  </div>
                </div>
              </TextField>

              <TextField
                  v-model="store.data.passwordConfirmation"
                  :errors="form.passwordConfirmation.$errors"
                  :has-error="form.passwordConfirmation.$error"
                  place-holder="Confirm Password"
                  type="password"
              />

              <TextError :error="store.error"/>

              <Button :disabled="store.isLoading" text="Finish"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DescriptionPanel from "@/components/auth/DescriptionPanel.vue";
import Button from "@/components/common/Button.vue";
import TextField from "@/components/common/TextField.vue";
import router from "@/router";
import TextError from "@/components/common/TextError.vue";
import {useChangePasswordStore} from "@/store/auth/changePassword.js";
import {onMounted} from "vue";

export default {
  name: "ChangePassword",
  components: {
    DescriptionPanel,
    Button,
    TextField,
    TextError,
  },
  setup() {
    const store = useChangePasswordStore()
    store.init()

    onMounted(() => {
      if (!store.email) {
        return router.push({name: "ForgotPassword"});
      }
    })

    const onSubmitClicked = () => {
      store.changePassword().then(() => {
        router.push({name: "Login"})
      }).catch(() => {
      })
    }

    return {
      store,
      onSubmitClicked,
      form: store.form,
    }
  }
}
</script>

<style scoped>

</style>