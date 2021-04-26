<template>
  <div class="virtualScroll">
    <VirtualList :listData="data" :itemSize="100"/>
    <!-- <div-test></div-test> -->
  </div>
</template>

<script>
import VirtualList from '@/components/VirtualScroll/FirstVirtualScroll.vue'
import DivTest from '@/components/VirtualScroll/div.test.vue'
const d = []
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i })
}
export default {
  components: {
    VirtualList,
    DivTest
  },
  data () {
    return {
      // 这是是一次加载所有的数据
      data: d
    }
  }
}
</script>
<style>
html{
  height: 100%;
}
body{
  height: 100%;
  margin:0;
}
</style>
<style lang="scss" scoped>

.virtualScroll {
  height:100%;
  background: #dddddd;
}
</style>
