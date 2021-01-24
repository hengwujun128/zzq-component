<template>
  <div class="firstGrid">
    <h2>居中对齐:</h2>
    <h3>wrapper dispaly: grid</h3>
    <h4>item display: flex</h4>
    <div class="container grid1">
      <div class="item grid1-item">1</div>
      <div class="item grid1-item">2</div>
      <div class="item grid1-item">3</div>
      <div class="item grid1-item">4</div>
      <div class="item grid1-item">5</div>
    </div>
    <h2>固定列数: grid-template-columns: repeat(3, 1fr);</h2>
    <h2>固定行数: grid-template-rows: repeat(2,100px)</h2>
    <h3>简写:grid-template: 先行后列: repeat(2,50px)/repeat(3, 1fr)</h3>
    <div class="container grid2">
      <div class="item grid2-item">1</div>
      <div class="item grid2-item">2</div>
      <div class="item grid2-item">3</div>
      <div class="item grid2-item">4</div>
      <div class="item grid2-item">5</div>
      <div class="item grid2-item">6</div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@import url('./basic.scss');
.container {
  .item{
    &:nth-child(1n){
      background-color: #96ceb4;	
    }
    &:nth-child(2n){
      background: #f5f5d5;
    }
    &:nth-child(3n) {
      background:#d4f1c3;
    }
    &:nth-child(4n){
      background-color: #ffcc5c
    }
  }
}
.firstGrid {
  .grid1{
    // wrapper 使用 grid
    display:grid;
    grid-template-columns: repeat(auto-fit,minMax(200px,1fr));
    grid-auto-rows: 200px;
    grid-column-gap: 10px;
    grid-row-gap:20px;
    &-item{
      //  item 使用 flex
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2em;
      &:nth-child(1n){
        background-color: #96ceb4;	
      }
      &:nth-child(2n){
        background: #f5f5d5;
      }
      &:nth-child(3n) {
        background:#d4f1c3;
      }
      &:nth-child(4n){
        background-color: #ffcc5c
      }
    }
  }
  .grid2{
    display: grid;
    // grid-template-columns: repeat(3, 1fr);
    // grid-template-rows: repeat(2, 100px);
    grid-template: repeat(2,150px)/repeat(3,1fr);
    gap: 10px;
    .item{
      display: flex;
      align-items:center;
      justify-content:center;
      font-size: 2rem;
    }
  }
}
</style>