<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row h-100vh">

        <DescriptionPanel>
          We can say something about<span>Digital Physics</span> here, and add a graphical element to show how CFD works
        </DescriptionPanel>
        <div class="col-lg-6 h-100vh gx-0">
          <div class="login-content h-100vh d-flex justify-content-center flex-column py-30">
            <div class="title">Login</div>

            <form @submit.prevent="onSubmitClicked">

              <TextField
                  v-model="v$.email.$model"
                  :errors="v$.email.$errors"
                  :has-error="v$.email.$error"
                  place-holder="User name/Email"
                  type="text"
              />

              <TextField
                  v-model="v$.password.$model"
                  :errors="v$.password.$errors"
                  :has-error="v$.password.$error"
                  place-holder="Password"
                  type="password"
              />

              <TextError :error="store.error"/>

              <div class="submit-wrapper">
                <Button :disabled="store.isLoading" text="Login" @click="onSubmitClicked"/>
                <router-link :to="{name:'ForgotPassword'}" class="forget-text">Forgot your password</router-link>
              </div>

              <div class="signup-wrapper">

                <small class="signup-text">Don't have an account ?</small>
                <router-link :to="{name:'RegisterInformation'}">
                  <Button text="Signup"/>
                </router-link>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DescriptionPanel from "@/components/auth/DescriptionPanel.vue";
import TextField from "@/components/common/TextField.vue";
import Button from "@/components/common/Button.vue";
import TextError from "@/components/common/TextError.vue";
import {useLoginStore} from "@/views/auth/login/home/login.js";
import {computed} from "vue";
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import router from "@/router/index.js";


export default {
  name: "Login",
  components: {
    DescriptionPanel,
    TextField,
    Button,
    TextError,
  },
  setup() {
    const store = useLoginStore()

    const rules = computed(() => {
      return {
        email: {required: required, email: email},
        password: {required}
      }
    })
    const v$ = useVuelidate(rules, store.data)

    const onSubmitClicked = async () => {
      const isValid = await v$.value.$validate()
      if (isValid) {
        store.login().then(() => {
          router.replace({name: "Home"});
        });
      }
    }
    return {
      store,
      v$,
      onSubmitClicked,
    };
  }
}
</script>

<style scoped>

</style>
