<template>
  <div class="second">
    <h2>合并列:四种方法</h2>
    <pre style="font-size:2em;">
      1. grid-column-start: 1 ;grid-column-end: index;
      2. grid-column: 1 / index;
      3. grid-column: 1 / span index;
      4. grid-column: 1 / -1 
    </pre>
    <div class="container">
      <div class="header">header</div>
      <div class="menu">menu</div>
      <div class="content">content</div>
      <div class="footer">footer</div>
    </div>
    <h2>列宽: grid-template-columns: 1fr 4fr;</h2>
    <h2>列宽: 对某个 item 中的列进行合并: .content{grid-column: 2/-1}</h2>
    <div class="container container2">
      <div class="header">header</div>
      <div class="menu">menu</div>
      <div class="content">content</div>
      <div class="footer">footer</div>
    </div>
    <!-- 合并行 -->
    <h2>合并行: grid-row: 1/3</h2>
    <div class="container container3">
      <div class="header">header</div>
      <div class="menu">menu</div>
      <div class="content">content</div>
      <div class="footer">footer</div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@import url('./basic.scss');
.second{
  .container{
    display:grid;
    gap:10px;
    grid-template-columns: repeat(2, 1fr);
    // grid-template-rows: 40px 200px 40px; 最后一行 40px does not work
    grid-template-rows: 40px 200px 40px;
    .header{
      // 合并列
      // grid-column-start: 1;
      // grid-column-end: 3; // 因为总列数是 2
      grid-column: 1 / 3;   // 合并列简写
    }
    .menu{

    }
    .content {

    }
    .footer{
      // grid-column: 1/3;    // 合并列: 
      // grid-column: 1/ span 2; // 合并列:跨 2 列
      grid-column: 1 / -1; // 合并列: 直到最后一列
    }
  }

/* ------------------------------- item 中的 列合并 ------------------------------ */
  .container2 {
    // grid-template-columns: 1fr 4fr; // 第一种方法 
    grid-template-columns: repeat(12,1fr); // 每行 12 列, 每列宽 1fr
    .header,.footer {
      grid-column: 1 / -1;
    }
    .content {
      grid-column: 2/-1;  // content 内部有 2列; 对第二列进行合并
    }
  }

/* ----------------------------------- 行合并 ---------------------------------- */
  .container3{
    grid-template-columns: repeat(12, 1fr);
    .header{
      grid-column: 2 / -1;
    }
    .menu {
      grid-row: 1 / 3;
    }
    .content{
      grid-column: 2 /-1;
    }
    .footer {
      grid-column: 1 / -1;
    }
  }
}
</style>