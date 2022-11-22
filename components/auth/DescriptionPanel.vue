<template>
  <div class="col-lg-6 h-100vh gx-0 d-lg-block d-none">
    <div class="login-img">
      <div class="login-img-content h-100vh d-flex justify-content-center flex-column py-30">
        <div class="login-logo">
          <img alt="" src="../../assets/img/logo.png">
        </div>
        <h6 class="login-text">
          <slot></slot>
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DescriptionPanel',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
