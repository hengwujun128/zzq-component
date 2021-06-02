<template>
  <div class="container">
    <h2>hello,headerNavigation</h2>
    <header>
      <div class="title title1">hello,this is title1</div>
      <!-- <div> -->
      <div class="title title2">hello,this is title2</div>
      <!-- </div> -->
    </header>

    <section class="content">
      <div class="section">section1</div>
      <div class="section">section2</div>
      <div class="section">section3</div>
      <div class="section">section4</div>
      <div class="section">section5</div>
      <div class="section">section6</div>
      <div class="section">section7</div>
      <div class="section">section8</div>
      <div class="section">section9</div>
      <div class="section">section10</div>
    </section>

  </div>
</template>

<script>
export default {
  data () {
    return {
      header: '',
      headerOffset: 0
    }
  },
  mounted () {
    // let EventHandler = this.debounce(this.scrollHandler, 300)
    //  header元素相对于页面的偏移量(不要在事件处理程序中获取,因为这个变量不应该变化,包括偏移量也不应该变化)
    this.header = document.querySelector('header')
    // scroll bar 滚动的距离: window.pageYOffset
    this.headerOffset = this.getEleOffset(this.header).top

    window.addEventListener('scroll', this.scrollHandler)
  },
  methods: {
    debounce (callback, duration) {
      let timer
      return function () {
        // 只执行最后一次的 action ,
        clearTimeout(timer)
        const context = this
        const args = arguments
        timer = setTimeout(function () {
          callback.apply(context, args)
        }, duration)
      }
    },

    scrollHandler () {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop
      console.log(scrollHeight, this.headerOffset)
      if (scrollHeight > this.headerOffset) {
        this.header.classList.add('sticky')
      } else {
        this.header.classList.remove('sticky')
      }
    },
    getEleOffset (ele) {
      const pos = {
        top: 0,
        left: 0
      }
      do {
        pos.top += ele.offsetTop || 0
        pos.left += ele.offsetLeft || 0
      } while ((ele = ele.offsetParent))
      return pos
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin transition($transition) {
  transition: $transition;
}
.container {
  header {
    width: 100%;
    height: 100px;
    background: #999999;
    position: relative;
    overflow: hidden;

    .title {
      position: absolute;

      height: 100%;
      width: 100%;
      color: #ffffff;
      font-size: 28px;
      line-height: 100px;
      @include transition(top 1s);
    }
    .title1 {
      left: 0px;
      top: 0px;
    }
    .title2 {
      top: 100px;
    }
  }

  .sticky {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    .title1 {
      top: -100px;
    }
    .title2 {
      top: 0px;
    }
  }
  //
  // .sticky + .content {
  //   padding-top: 102px;
  // }

  section {
    background: #dddddd;
    padding: 16px;
    .section {
      height: 400px;
      width: 600px;
      font-size: 24px;
      margin: 10px auto;
      background: #555555;
      color: #ffffff;
      line-height: 400px;
    }
  }
}
</style>
