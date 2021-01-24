<template>
  <div>
    <h2>item 固定初始宽度,有多余宽度item 可以扩大,但是不可以缩小;</h2>
    <div class="wrapper">
      <div class="wrapper-item">1</div>
      <div class="wrapper-item">2</div>
      <div class="wrapper-item">3</div>
      <div class="wrapper-item">4</div>
      <div class="wrapper-item">5</div>
      <div class="wrapper-item">6</div>
      <div class="wrapper-item">7</div>
      <div class="wrapper-item">8</div>
      <div class="wrapper-item">9</div>
    </div>
    <h3>flex 布局会导致最后一个 item 大小不固定的问题</h3>
    <h2>grid: 无固定列数,完美解决 item 宽度不一致的问题</h2>
    <div class="grid1">
      <div class="grid1-item">
        <div class="content">1</div>
      </div>
      <div class="grid1-item">
        <div class="content">2</div>
      </div>
      <div class="grid1-item">
        <div class="content">3</div>
      </div>
      <div class="grid1-item">
        <div class="content">4</div>
      </div>
      <div class="grid1-item">
        <div class="content">5</div>
      </div>
      <div class="grid1-item">
        <div class="content">6</div>
      </div>
      <div class="grid1-item">
        <div class="content">7</div>
      </div>
      <div class="grid1-item">
        <div class="content">8</div>
      </div>
      <div class="grid1-item">
        <div class="content">9</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.wrapper{
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  &-item{
    // flex: 1 1 150px; 可以扩大,可以缩小,始终占满屏幕
    flex: 1 0 150px;
    height: 100px;
    margin:5px;
    &:nth-child(2n){
      background: #f5f5d5;
    }
    &:nth-child(2n+1) {
      background:#d4f1c3;
    }
  }
}
.grid1{
  display:grid;
  // grid-template-columns: 1fr 1fr; // 固定 2 列
  grid-template-columns: repeat(auto-fit, minMax(150px, 1fr)); // auto-fit:无固定列数
  // grid-template-rows: repeat(2, 200px);// 2 行,每行高度 200px ,对其它行没有作用
  grid-auto-rows: 200px;  // 无固定行数,每行高度 200px
  grid-gap: 10px;
  // align-items: center;       // 每个 item 的内容在 item 中的水平位置
  // justify-items: center;  // 每个 item 的内容在 item 中的垂直位置

  // align-content: center;  //所有 items 在 wrapper 中的水平位置
  // justify-content: center; //所有items 在 wraper 中的垂直位置
  &-item{
    &:nth-child(2n){
      background: #f5f5d5;
    }
    &:nth-child(2n+1) {
      background:#d4f1c3;
    }
    .content{
      width:100%;
      height:100%;
      display:flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>