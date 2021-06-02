<template>
  <div class="wrapper">
    <div class="child">1 </div>
    <div class="child">2</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 600px;
  overflow: auto;
  background: green;
  .child:nth-child(1){
    background: red;
    position: absolute;
    height: 100000px;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }
  .child:nth-child(2) {

    height: 300px;
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    background: yellow;
    text-align: center;
  }
}
</style>
