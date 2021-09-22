<template>
  <div>
    <div class="box">
      <p>下面这个是截图，只有“加入购物车”按钮可以点击：</p>
      <div class="image-x">
        <img src="./shopping.png"/>
        <a href="javascript:" id="btnCart" class="btn-cart" @click="clickHandler"></a>
      </div>
    </div>
    <div id="shopCart" class="shop-cart">购物车 <span>0</span></div>
    <!-- item 图片 -->
    <div id="flyItem" class="fly-item">
      <img src="./book.jpg">
    </div>
  </div>
</template>

<script>
/* eslint-disable no-debugger */

export default {
  data () {
    return {}
  },
  mounted () {
    // const eleBtn = document.getElementById('btnCart')
    // const eleFlyItem = document.getElementById('flyItem')
    // const eleFlyImg = eleFlyItem.querySelector('img')
    // const eleCart = document.querySelector('#shopCart')
    // debugger
    // let isRunning = false
    // eleBtn.addEventListener('click', function () {
    //   debugger
    //   // 现在按钮距离购物车的距离
    //   const boundBtn = eleBtn.getBoundingClientRect()
    //   const boundCart = eleCart.getBoundingClientRect()
    //   // 中心点的水平垂直距离
    //   const offsetX = boundCart.left + boundCart.width / 2 - (boundBtn.left + boundBtn.width / 2)
    //   const offsetY = boundCart.top + boundCart.height / 2 - (boundBtn.top + boundBtn.height / 2)
    //   // 页面滚动尺寸
    //   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0
    //   const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0
    //   if (isRunning == false) {
    //     // 购物车图形出现与初始定位
    //     eleFlyItem.style.display = 'block'
    //     eleFlyItem.style.left = (boundBtn.left + scrollLeft + this.clientWidth / 2) + 'px'
    //     eleFlyItem.style.top = (boundBtn.top + scrollTop + this.clientHeight / 2) + 'px'
    //     // 开始动画
    //     eleFlyItem.style.transform = 'translateX(' + offsetX + 'px)'
    //     eleFlyImg.style.transform = 'translateY(' + offsetY + 'px)'
    //     // 动画标志量
    //     isRunning = true
    //     setTimeout(function () {
    //       eleFlyItem.style.display = ''
    //       eleFlyItem.style.transform = 'translateX(0)'
    //       eleFlyImg.style.transform = 'translateY(0)'
    //       isRunning = false
    //       eleCart.querySelector('span').innerHTML = eleCart.querySelector('span').innerHTML * 1 + 1
    //     }, 490)
    //   }
    // })
  },
  methods: {
    clickHandler (e) {
      const eleBtn = e.target // 点击对象
      const eleFlyItem = document.getElementById('flyItem') // 小球(默认是不可见)
      const eleFlyImg = eleFlyItem.querySelector('img') // 小球下的图片
      const eleCart = document.querySelector('#shopCart') // 目标点
      let isRunning = false
      // 现在按钮距离购物车的距离
      const boundBtn = eleBtn.getBoundingClientRect()
      const boundCart = eleCart.getBoundingClientRect()
      // 中心点的水平垂直距离 (目标点 与 点击点 距离)
      const offsetX = boundCart.left + boundCart.width / 2 - (boundBtn.left + boundBtn.width / 2)
      const offsetY = boundCart.top + boundCart.height / 2 - (boundBtn.top + boundBtn.height / 2)
      // 页面滚动尺寸
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0

      if (isRunning === false) {
        // 小球图形出现与初始定位
        eleFlyItem.style.display = 'block'
        // 小球的偏移位置 是相对于 点击对象的中心点( 这一步可以不用要的)
        eleFlyItem.style.left = (boundBtn.left + scrollLeft + eleBtn.clientWidth / 2) + 'px'
        eleFlyItem.style.top = (boundBtn.top + scrollTop + eleBtn.clientHeight / 2) + 'px'
        // 开始动画
        eleFlyItem.style.transform = 'translateX(' + offsetX + 'px)'
        eleFlyImg.style.transform = 'translateY(' + offsetY + 'px)'
        // 动画标志量
        isRunning = true
        setTimeout(function () {
          eleFlyItem.style.display = ''
          eleFlyItem.style.transform = 'translateX(0)'
          eleFlyImg.style.transform = 'translateY(0)'
          isRunning = false
          eleCart.querySelector('span').innerHTML = eleCart.querySelector('span').innerHTML * 1 + 1
        }, 490)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
    width: 625px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
}
.image-x {
    position: relative;
    padding: 52.24% 50%;
    img{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
}
.btn-cart {
    position: absolute;
    width: 22.72%;
    height: 7.04441%;
    left: 15.84%;
    top: 84.8392%;
    text-indent: -99em;
    overflow: hidden;
}
.shop-cart {
    width: 283px;
    height: 25px;
    line-height: 25px;
    padding-top: 8px;
    background: url(./shopping-cart.png);
    font-family: 'microsoft yahei';
    font-size: 12px;
    text-indent: 34px;
    color: #000;
    position: fixed;
    right: 10px;
    bottom: 0;
}
.fly-item,
.fly-item > img {
    position: absolute;
    width: 50px; height: 50px;
    transition: transform .5s;
}
.fly-item {
    display: none;
    margin: -25px 0 0 -25px;
    transition-timing-function: linear;
    opacity: .5;
}
.fly-item > img {
    transition-timing-function: cubic-bezier(.55,0,.85,.36);
    outline: 1px solid rgb(221,46,59);
}
</style>
