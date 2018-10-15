<template>
  <div id="app">
    <HeaderBar />
    <Main />
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar"
import Main from "@/components/Main" 
export default {
  name: 'App',
  components: {
    HeaderBar,
    Main
  }
}
</script>

<style>
  @import "./app.scss";
</style>
