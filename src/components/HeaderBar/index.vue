<template>
  <div class="headerbar-container">
    <mu-flex class="flex-wrapper" align-items="center">
        <mu-flex class="flex-demo" justify-content="center" fill>
          <!-- <slot name="arrow-back"></slot> -->
          <i slot="arrow-back" class="icon-arrow-back" @click="goBack"></i>
          <h3 class="title">2018 全球生物识别大会</h3>
        </mu-flex>
    </mu-flex>
  </div>
</template>
<script>
export default {
  name: "HeaderBar",
  methods: {
    goBack() {
      const history = window.history.length;
      console.log(history);
      if (history > 0) {
        this.$router.back(-1);
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>


