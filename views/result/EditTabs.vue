<template>
  <div id="editingTabModal" ref="modal" aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade"
       tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <h5 class="titr-style">Tabs' name</h5>
          <div class="tab-name-input">
            <div class="form-input-group">
              <TextField
                  v-model="store.data.tab1"
                  :errors="form.tab1.$errors"
                  :has-error="form.tab1.$error"
                  place-holder="Selection 1"
                  type="text"
              />
            </div>
            <div class="form-input-group">
              <TextField
                  v-model="store.data.tab2"
                  :errors="form.tab2.$errors"
                  :has-error="form.tab2.$error"
                  place-holder="Selection 2"
                  type="text"
              />
            </div>
            <div class="form-input-group">
              <TextField
                  v-model="store.data.tab3"
                  :errors="form.tab3.$errors"
                  :has-error="form.tab3.$error"
                  place-holder="Selection 3"
                  type="text"
              />
            </div>
            <div class="form-input-group">
              <TextField
                  v-model="store.data.tab4"
                  :errors="form.tab4.$errors"
                  :has-error="form.tab4.$error"
                  place-holder="Selection 4"
                  type="text"
              />
            </div>
          </div>
          <div class="btn-row">
            <Button :is-next-button="false" data-bs-dismiss="modal" text="cancel" type="button"/>
            <Button text="Apply" type="button" @click="onSubmitClicked"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/common/Button.vue";
import TextField from "@/components/common/TextField.vue";
import {useEditTabsStore} from "@/store/editTabs.js";
import {ref} from "vue";

export default {
  name: "EditTabs",
  components: {
    Button,
    TextField,
  },
  setup() {
    const modal = ref()
    const store = useEditTabsStore()
    store.init()

    const onBackClicked = () => {
      modal.value.click()

    }
    const onSubmitClicked = () => {
      store.saveTabs().then(() => {
        onBackClicked()
      }).catch(() => {
      })
    }

    return {
      modal,
      store,
      onBackClicked,
      onSubmitClicked,
      form: store.form,
    }
  }
}
</script>

<style scoped>

</style>