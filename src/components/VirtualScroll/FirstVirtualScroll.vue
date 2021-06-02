<template>
<!-- https://juejin.cn/post/6844903982742110216#heading-3 -->
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <!-- 英 ['fæntəm] n. 幻影；幽灵 -->
    <!-- 1. 为了让 container 出现滚动条,这里放置一个 div,并设置高度 -->
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <!-- 2. list wrapper -->
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div ref="items"
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }"
      >
      <span>第{{ item.value }}条数据</span>
      </div>
    </div>
  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
const lastOffset = 0
export default {
  name: 'FirstVirtualList',
  props: {
    // 所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    // 每项高度
    itemSize: {
      type: Number,
      default: 200
    }
  },
  computed: {
    // 列表总高度
    listHeight () {
      return this.listData.length * this.itemSize
    },
    // note:可显示的列表项数(尽量显示更多)
    visibleCount () {
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    // note:偏移量对应的style()
    getTransform () {
      return `translate3d(0,${this.startOffset}px,0)`
    },
    // 获取真实显示列表数据
    visibleData () {
      return this.listData.slice(this.start, Math.min(this.end, this.listData.length))
    }
  },
  /*   note:可是区域的高度(wrapper的高度):就是当前组件的实例的clientHeight */
  mounted () {
    // 元素的内部高度(innerHeight) height+padding
    this.screenHeight = this.$el.clientHeight
    console.log('可视区域的高度', this.screenHeight)
    // 可视区域列表项 开始索引
    this.start = 0
    //  可视区域  结束索引
    this.end = this.start + this.visibleCount
  },
  data () {
    return {
      // 可视区域高度:
      screenHeight: 0,
      // note: 偏移量: startIndex 在哪里,就要偏移到到 startIndex 的位置
      startOffset: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: null
    }
  },
  methods: {
    /**
      通过wrapper的 scroll 事件 计算wrapper要偏移的起始位置,并通过 transform 偏移,
      1. 获取scrollbar的位置;
      2. 设置可视区开始结束索引值,进而通过计算属性获取可视区域数据
      3. 重置 offset 偏移量: 偏移量其实就是 把渲染区域偏移至可视区域中
     */
    //
    scrollEvent () {
      //  1. 当前滚动位置
      const scrollTop = this.$refs.list.scrollTop
      // 2. 根据滚动条位置,计算出可视区域的开始索引
      this.start = Math.floor(scrollTop / this.itemSize)
      // 3. 计算出可视区域的结束索引
      this.end = this.start + this.visibleCount
      // note:此时的偏移量: 1050 - (1050 % 100) = 1000
      // this.startOffset = scrollTop - (scrollTop % this.itemSize)
      // 此时的偏移量等于第一个元素的的位置: 就是渲染区域偏移到 可视区域中第一个元素位置
      this.startOffset = this.start * this.itemSize
      // this.startOffset = scrollTop - lastOffset
      // lastOffset = scrollTop
    },
    scrollHandler () {

    },
    debounceHandler (callback, delay) {
      let timer
      return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          callback.apply(null, arguments)
        }, delay)
      }
    }
  }
}
</script>

<style scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
