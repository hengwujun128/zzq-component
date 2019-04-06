<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <ScrollTest></ScrollTest> -->
    <sequentialTest></sequentialTest>
  </div>
</template>

<script>
/* 
这里主要测试 自定义的 component,directive,

 */
import HelloWorld from './components/HelloWorld.vue'
import ScrollTest from "./components/scrollTest.vue";
import sequentialTest from './components/sequentialTest';

export default {
  name: "app",
  components: {
    // HelloWorld,
    // ScrollTest,
    sequentialTest
  },
  mounted () {
    console.log(process.env.VUE_APP_SECRET)
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
