<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row h-100vh">

        <DescriptionPanel>
          We can say something about
          <span>Digital Physics</span> here, and add a graphical element to show how CFD works.
        </DescriptionPanel>
        <div class="col-lg-6 h-100vh gx-0">
          <div class="register-content h-100vh d-flex justify-content-center flex-column py-30">
            <div class="title">Register</div>
            <form @submit.prevent="onSubmitClicked">

              <TextField
                  v-model="v$.email.$model"
                  :errors="v$.email.$errors"
                  :has-error="v$.email.$error"
                  place-holder="Email"
                  type="email"
              />

              <TextField
                  v-model="v$.password.$model"
                  :errors="v$.password.$errors"
                  :has-error="v$.password.$error"
                  place-holder="Password"
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
                  v-model="v$.repeatPassword.$model"
                  :errors="v$.repeatPassword.$errors"
                  :has-error="v$.repeatPassword.$error"
                  place-holder="Confirm Password"
                  type="password"
              />

              <TextField
                  v-model="v$.firstName.$model"
                  :errors="v$.firstName.$errors"
                  :has-error="v$.firstName.$error"
                  place-holder="First Name"
              />

              <TextField
                  v-model="v$.lastName.$model"
                  :errors="v$.lastName.$errors"
                  :has-error="v$.lastName.$error"
                  place-holder="Last Name"
              />

              <TextField
                  v-model="v$.company.$model"
                  :errors="v$.company.$errors"
                  :has-error="v$.company.$error"
                  place-holder="Company"
              />

              <TextField
                  v-model="v$.role.$model"
                  :errors="v$.role.$errors"
                  :has-error="v$.role.$error"
                  place-holder="Role"
              />

              <TextError :error="store.error"/>

              <Button :disabled="store.isLoading" text="Next" @click="onSubmitClicked"/>

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
import router from "@/router/index.js";
import Button from "@/components/common/Button.vue";
import TextError from "@/components/common/TextError.vue";
import {useRegisterInformationStore} from "@/views/auth/register/personal/registerInformation.js";
import {computed} from "vue";
import {email, helpers, minLength, required, sameAs} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {passwordValidator} from "@/compositions/helper/validationHelper.js";

export default {
  name: 'RegisterInformation',
  components: {
    Button,
    DescriptionPanel,
    TextField,
    TextError,
  },
  setup() {
    const store = useRegisterInformationStore()

    const rules = computed(() => {
      return {
        email: {required, email},
        password: {
          required: required,
          minLength: minLength(8),
          validator: helpers.withMessage('Must have at least one uppercase letter, one lowercase letter and one number', passwordValidator)
        },
        repeatPassword: {required: required, sameAsPassword: sameAs(store.data.password)},
        firstName: {required},
        lastName: {required},
        company: {},
        role: {},
      }
    })
    const v$ = useVuelidate(rules, store.data)

    const onSubmitClicked = async () => {
      const isValid = await v$.value.$validate()
      if (isValid) {
        store.register().then(() => {
          router.push({name: "VerifyRegister"})
        });
      }
    }

    return {
      store,
      v$,
      onSubmitClicked
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
