<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <ScrollTest></ScrollTest> -->
    <!-- ZButton 因为是全局注入所以说可以直接使用 -->
    <!-- <ZButton></ZButton> -->
    <!-- <sequentialTest></sequentialTest> -->

    <tooltip>
      hello
    </tooltip>
  </div>
</template>

<script>
/* 
这里主要测试 自定义的 component,directive,

 */
import ScrollTest from "./views/scrollTest.vue"
import sequentialTest from "./views/sequentialTest"
// import moduleName from ""

export default {
  name: "app",
  components: {
    ScrollTest,
    sequentialTest
  },
  mounted() {
    console.log(process.env.VUE_APP_SECRET)
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
