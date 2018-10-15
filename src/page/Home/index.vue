<template>
    <div class="home-wrapper">
        <mu-flex class="flex-wrapper" align-items="center">
            <mu-flex class="flex-demo" justify-content="center" fill>
                
            </mu-flex>
        </mu-flex>
        <div class="home-container">
          <div class="home-header">
              <div class="header-logo">
                  <img src="static/images/logo.png" alt="">
              </div>
          </div>
          <div class="home-body">
              <div class="body-title">
                <div class="b-title-text">

                </div>
              </div>
              <div class="body-register">
                  <div class="b-register-btn" @click="register">
                      入场登记
                      <span>Register</span>
                  </div>
              </div>
              <div class="body-text">
                  <h2>
                    诚挚欢迎您莅临现场
                  </h2>
                  <h2>
                    WELCOME TO JOIN US 
                  </h2>
              </div>
          </div>
          <div class="home-footer">
              <div class="footer-time">
                  <p class="time">10/19 周五</p>
              </div>
              <div class="footer-desc">
                  <div class="f-desc-left">
                    <p>深圳会展中心</p> 
                    <p>五楼 | 簕杜鹃厅</p>
                  </div>
                  <div class="f-desc-right">
                    <p>shenzhen Convention & Exhibition Center</p>
                    <p>Bougainvillea Hall,5F</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "Home",
  methods:{
    register() {
      this.$router.push("/register")
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>


