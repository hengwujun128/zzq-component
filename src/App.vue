<template>
<div id="app">
  <router-view></router-view>
  <!-- <v-modals-container></v-modals-container>
  <v-dialog></v-dialog>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <ScrollTest></ScrollTest> -->
  <!-- ZButton 因为是全局注入所以说可以直接使用 -->
  <!-- <div class="buttonContainer">
    <ZButton @click="showModal" class="btn">modal</ZButton>
    <ZButton class="btn">dynamicModal</ZButton>
    <ZButton class="btn" @click="showDialog">dialog</ZButton>
  </div> -->

  <!-- <sequentialTest></sequentialTest> -->

  <!-- <tooltip> hello </tooltip> -->

  <!-- <ZModal name="my-first-modal" draggable resizable :minWidth="100" height="auto" :scrollable="true">
    <h2>this is modal title</h2>
    <p>This is my first modal</p>
  </ZModal> -->
</div>
</template>

<script>
/*
这里主要测试 自定义的 component,directive,

 */
import ScrollTest from './views/scrollTest.vue'
import sequentialTest from './views/sequentialTest'
// import moduleName from ""

export default {
  name: 'app',
  components: {
    ScrollTest,
    sequentialTest
  },
  mounted () {
    console.log(process.env.VUE_APP_SECRET)
  },
  methods: {
    name () {},
    showModal () {
      this.$modal.show('my-first-modal', {})
      /*
       * dynamic modal
       * */
      // this.$modal.show(
      //     sequentialTest,
      //     {},
      //     {},
      //     {}
      // )
    },
    showDialog () {
      this.$modal.show('dialog', {
        title: 'Alert!',
        text: 'You are too awesome',
        buttons: [{
          title: 'Deal with it',
          handler: () => {
            alert('Woot!')
          }
        },
        {
          title: '123', // Button title
          default: true, // Will be triggered by default if 'Enter' pressed.
          handler: () => {} // Button click handler
        },
        {
          title: 'Close'
        }
        ]
      })
    },
    hide () {
      this.$modal.hide('my-first-modal')
    }
  }
}
</script>

<style lang="scss" scoped>

#app {
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;

  .buttonContainer {
    display: flex;
    align-items: center;

    .btn {
      margin: 0 10px;
    }
  }
}
</style>
