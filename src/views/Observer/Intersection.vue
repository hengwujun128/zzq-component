<template>
  <div class="intersection">
    <router-link :to="{path: '/directive/lazyload'}">
      <h4>图片懒加载</h4>
    </router-link>
    <router-link :to="{path:'/observer/scrollLoadMore'}">
    <h4>滚动加载</h4>
    </router-link>
    <router-link :to="{path: '/observer/virtualScroll'}">
      <h4>虚拟滚动</h4>
    </router-link>
    <h4>兴趣埋点</h4>
    <h4>控制动画/视频 执行</h4>
    <router-link :to="{path: '/animation/flyBall'}">
      <h4>飞入动画</h4>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.intersection {
  h4 {
    cursor: pointer;
  }
}
</style>
