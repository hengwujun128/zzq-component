<template>
  <div class="third">
    <h2>grid 某一行高度自适应: 容器 height:100%; 正定 item 的row高度:auto
    </h2>
    <h2>grid-template-area: 配合item的grid-area使用</h2>
    <div class="container container1">
      <div class="header">header</div>
      <div class="menu">menu</div>
      <div class="content">content</div>
      <div class="footer">footer</div>
    </div>
    <h2>grid column:不换行的自适应|换行的自适应|固定列宽</h2>
    <h3>固定列宽:grid-template-columns: repeat(6,100px);</h3>
    <h3>不换行自适应列宽: grid-template-columns: repeat(6,1fr);</h3>
    <h3>换行的自适应: grid-template-columns: repeat(6,1fr);</h3>
    <div class="container container2">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
      <div>11</div>
      <div>12</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
@import url('./basic.scss');
.third {
  height: 100vh;
  .container1 {
    height:100%;  // 设置容器高度 100%;为了高度自适应
    display: grid;
    grid-template-columns: repeat(12,1fr); // 固定列数:12 列
    grid-template-rows: 40px auto 40px;    // 固定行数 3 行
    grid-gap: 10px;
    grid-template-areas: 
      'h h h h h h h h h h h h'
      'l r r r r r r r r r r r'
      'f f f f f f f f f f f f';
    .header {
      grid-area: h;
    }
    .menu {
      grid-area: l;
    }
    .content {
      grid-area: r;
    }
    .footer {
      grid-area: f;
    }
  }
  .container2{
    display:grid;
    // grid-template-columns: repeat(6,100px);  // 固定列宽
    grid-template-columns: repeat(6,1fr);  // 自适应列宽
    grid-template-rows: repeat(2,100px);
    gap: 10px;
  }
}
</style>