<template>
  <div class="fly">
    <ul class="ball">
      <li class="ball-item" v-for="item in list" :key="item.id" @click="addToCars(item)">
        {{item.value}}
        <span :id="'flyItem'+item.key" class="fly-item">
          <img src="./book.jpg">
        </span>
      </li>
    </ul>
    <div class="footer">
      <span id="shopCart" class="shop-cart"> 购物车<span>0</span></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'hello',
      list: [
        { key: 1, value: 1 },
        { key: 2, value: 2 },
        { key: 3, value: 3 },
        { key: 4, value: 4 },
        { key: 5, value: 5 },
        { key: 6, value: 6 }
      ],
      showMoveDot: [], // 控制下落的小圆点显示隐藏
      elLeft: 0, // 当前点击购物车按钮在网页中的绝对top值
      elTop: 0, // 当前点击购物车按钮在网页中的绝对left值
      dropImage: ''
    }
  },
  methods: {
    addToCars (item) {
      const clickTarget = event.target
      const ball = document.getElementById('flyItem' + item.key) // 小球(默认是不可见)
      const ballImg = ball.querySelector('img') // 小球下的图片
      const target = document.querySelector('#shopCart') // 目标点

      let isRunning = false
      // 现在点击按钮距离购物车的距离
      const boundBtn = clickTarget.getBoundingClientRect()
      const boundCart = target.getBoundingClientRect()
      // console.log(boundBtn)
      // 中心点的水平垂直距离 (目标点 与 点击点 距离)
      const offsetX = boundCart.left + boundCart.width / 2 - (boundBtn.left + boundBtn.width / 2)
      const offsetY = boundCart.top + boundCart.height / 2 - (boundBtn.top + boundBtn.height / 2)

      // 页面滚动尺寸
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0
      const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0

      if (isRunning === false) {
        // 小球的出现与初始定位
        ball.style.display = 'block'
        // 小球的偏移位置 是相对于 点击对象的中心点( 这一步可以不用要的)
        ball.style.left = (boundBtn.left + scrollLeft + clickTarget.clientWidth / 2) + 'px'
        ball.style.top = (boundBtn.top + scrollTop + clickTarget.clientHeight / 2) + 'px'
        console.log(scrollTop, scrollLeft)

        // 开始动画
        ball.style.transform = 'translateX(' + offsetX + 'px)'
        ballImg.style.transform = 'translateY(' + offsetY + 'px)'
        // 动画标志量
        isRunning = true
        setTimeout(function () {
          ball.style.display = ''
          ball.style.transform = 'translateX(0)'
          ballImg.style.transform = 'translateY(0)'
          isRunning = false
          target.querySelector('span').innerHTML = target.querySelector('span').innerHTML * 1 + 1
        }, 800)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
.fly {
  margin: 10px;
  position: relative;
  .ball {
    display: flex;
    align-items: center;
    &-item {
      position: relative;
      width: 200px;
      height: 150px;
      line-height: 150px;
      font-size: 30px;
      margin: 0 10px;
      background-color:#ddd;
      text-align: center;
    }
  }
}

.fly-item {
  display: none;
  width: 50px; height: 50px;
  transition: transform 0.8s;

  margin: -25px 0 0 -25px;
  transition-timing-function: linear;
  opacity: .5;
  img{
    width: 50px; height: 50px;
    transition: transform 0.8s;

    transition-timing-function: cubic-bezier(.55,0,.85,.36);
    outline: 1px solid rgb(221,46,59);
  }
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
    left: 10px;
    bottom: 0;
}
</style>
