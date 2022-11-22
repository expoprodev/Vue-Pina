<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row h-100vh">

        <DescriptionPanel>
          We can say something about
          <span>Digital Physics</span> here, and add a graphical element to show how CFD works
        </DescriptionPanel>

        <div class="col-lg-6 h-100vh gx-0">
          <div class="verify-content h-100vh d-flex justify-content-center flex-column">
            <div class="title">Forgot Password</div>
            <div class="verify-text">
              <p>We sent you a security code to your email</p>
              <div class="verify-email" @click="onEditButtonClicked"><span>Edit </span>{{ store.email }}</div>
            </div>
            <div class="verify-code ">
              <h6>Enter the code</h6>
              <div class="d-flex">
                <OtpInput
                    v-model="store.otpInput"
                    :is-input-num="true"
                    :num-inputs="5"
                    :should-auto-focus="true"
                    input-classes="otp-input"
                    @on-complete="onSubmitClicked"
                />
              </div>
            </div>

            <TextError :error="store.error"/>

            <div class="resend">
              <Button :disabled="store.isLoading" text="Finish" @click="onSubmitClicked"/>
              <Button :disabled="store.resetButtonDisable||store.isLoading" class="resend-code"
                      @click="onResendCodeClicked">
                <i class="fal fa-sync"></i>
                <CountDown v-model="store.timerSeconds"/>
                Resend code
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DescriptionPanel from "@/components/auth/DescriptionPanel.vue";
import OtpInput from "@/components/auth/otp/OtpInput.vue";
import router from "@/router";
import CountDown from "@/components/auth/otp/CountDown.vue";
import Button from "@/components/common/Button.vue";
import TextError from "@/components/common/TextError.vue";
import {onMounted} from "vue";
import {useVerifyForgotPasswordStore} from "@/store/auth/verifyForgotPassword.js";

export default {
  name: "VerifyForgotPassword",
  components: {
    Button,
    CountDown,
    OtpInput,
    DescriptionPanel,
    TextError,
  },
  setup() {
    const store = useVerifyForgotPasswordStore()
    store.init()

    onMounted(() => {
      if (!store.email) {
        return router.push({name: "ForgotPassword"});
      }
    })

    const onSubmitClicked = () => {
      store.verify().then(() => {
        router.replace({name: "ChangePassword"})
      }).catch(() => {
      })
    }
    const onResendCodeClicked = () => {
      store.resendCode()
    }
    const onEditButtonClicked = () => {
      router.go(-1)
    }
    return {
      store,
      onSubmitClicked,
      onResendCodeClicked,
      onEditButtonClicked,
    }
  }
}
</script>

<style scoped>

</style>