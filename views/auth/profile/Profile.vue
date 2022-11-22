<template>
  <div class="header-title">
    <h4>Profile</h4>
  </div>
  <div class="main-profile">
    <div class="user-info-container">
      <div class="user-info">
        <div class="user-profile-img">
          <img :src="profileStore.data.profileImage" alt="" @click="onProfileClicked"/>
          <i class="far fa-edit edit"></i>
        </div>
        <div class="user-profile-info">
          <h6 class="titr-style">{{ profileStore.data.firstname }} {{ profileStore.data.lastname }}</h6>
          <span>{{ profileStore.data.username }}</span>
          <span class="user-credit">Credits {{ profileStore.data.credit / 1000 }}k</span>
        </div>
      </div>
      <div class="user-info-form">
        <form action="" @submit.prevent="onSubmitClicked">
          <div class="row">
            <div class="col-sm-5">
              <TextField
                  v-model="profileStore.data.firstname"
                  place-holder="First name"
                  type="text"
                  :errors="form.firstname.$errors"
                  :has-error="form.firstname.$error"
              />
            </div>
            <div class="col-sm-2">
              <TextField
                  v-model="profileStore.data.midName"
                  place-holder="Middle name"
                  type="text"
              />
            </div>
            <div class="col-sm-5">
              <TextField
                  v-model="profileStore.data.lastname"
                  place-holder="Last name"
                  type="text"
                  :errors="form.lastname.$errors"
                  :has-error="form.lastname.$error"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-sm-6">
              <TextField
                  v-model="profileStore.data.roleInCompany"
                  place-holder="Role"
                  type="text"
              />
            </div>
            <div class="col-sm-6">
              <TextField
                  v-model="profileStore.data.company"
                  place-holder="Company"
                  type="text"
              />
            </div>
          </div>
        </form>
      </div>
      <Button :disabled="profileStore.isLoading" text="Save" @click="profileStore.onSubmitClicked"/>
    </div>

    <div class="acc-notification">
      Receive notification via Email
      <div class="form-check">
        <input
            checked
            class="form-check-input tools-option-input"
            type="checkbox"
        />
        <label class="form-check-label"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </label>
      </div>
    </div>

    <a class="link-btn" href="">Change password</a>

    <div class="user-account-credit">
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" data-bs-toggle="tab" href="#account"
          >Account balance</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-bs-toggle="tab" href="#payment"
          >Payment Overview
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <div id="account" class="tab-pane active">
          <div class="account-balance tab-box">
            <h6 class="titr-style">Credits {{ profileStore.data.credit / 1000 }}k</h6>
            <div class="progress">
              <div
                  aria-valuemax="100"
                  aria-valuemin="0"
                  aria-valuenow="0"
                  class="progress-bar"
                  role="progressbar"
              ></div>
            </div>
            <button class="btn btn-style">Purchase Credits</button>
            <h6 class="titr-style">Balance history</h6>
            <div :data-version="profileStore.hasChanged" class="account-balance-chart">
              <PlotlyChart :chartId="profileStore.chart.chartId" :config="profileStore.chart.config"
                           :layout="profileStore.chart.layout" :traces="profileStore.chart.traces"/>
            </div>
          </div>
        </div>
        <div id="payment" class="tab-pane fade">
          <br/>
          <div class="payment-history">
            <div class="payment-method tab-box">
              <h6 class="titr-style">How you Pay</h6>
              <div class="add-method">
                <div class="method-item tab-box">
                  <span class="tooltiptext">Manage Cards</span>
                  <div class="blue-icon"></div>
                  <div class="method-item-content">
                    <div>Amex ..... 2021</div>
                    <div>Expires 12/23</div>
                  </div>
                </div>
                <div class="add-method-item tab-box">Add +</div>
              </div>

              <button class="btn btn-style" type="submit">
                Manage payment methods
              </button>

            </div>
          </div>
          <div class="payment-archive tab-box">
            <div class="head-payment-archive">
              <h6 class="titr-style">Transaction</h6>
              <button class="btn btn-style" type="submit">
                Yearly statements
              </button>
            </div>
            <div class="payment-archive-body">
              <div class="payment-archive-item">
                <span class="dateofpay">Aug 1 - 17,2021</span>
                <div><span class="price-item">$30.40</span></div>
              </div>
              <div class="payment-archive-item">
                <span class="dateofpay">Jul 1 - 31,2021</span>
                <div>
                  <span class="price-item">$3.57</span>
                  <a download href=""
                  ><i class="far fa-download"></i
                  ></a>
                </div>
              </div>
              <div class="payment-archive-item">
                <span class="dateofpay">Jul 1 - 30,2021 </span>
                <div>
                  <span class="price-item">$1.90</span>
                  <a download href=""
                  ><i class="far fa-download"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/common/TextField.vue";
import Button from "@/components/common/Button.vue";
import PlotlyChart from "@/components/charts/PlotlyChart.vue";
import {useProfileStore} from "@/store/profile.js";
import router from "@/router";

export default {
  name: 'Profile',
  components: {
    PlotlyChart,
    TextField,
    Button,
  },
  setup() {
    const profileStore = useProfileStore()
    profileStore.getProfileDetails()
    profileStore.getProfileImage()

    const handleImageSubmitted = async (imageFile) => {
      profileStore.updateProfileImage(imageFile)
    };

    const onProfileClicked = () => {
      router.push({name: "Profile Image"});
    }

    return {
      handleImageSubmitted,
      onProfileClicked,
      profileStore,
      form: profileStore.form
    }
  }
}
</script>

<style scoped>
/* todo remove it after style fixed */
.account-balance-chart {
  height: auto !important;
}
</style>