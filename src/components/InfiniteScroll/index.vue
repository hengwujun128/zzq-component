<script>
/* 没有使用 template 的 vue 组件
  functional component 套路:
  1.要生成容器元素:createElement('div',data,children);this.$slots.default获取组件插槽内容
  2. children 是个数组[bar,bar]
  3. 使用css3 animation 实现无限滚动

 */
export default {
  name: 'infinite-scroll',
  props: {
    barStyle: Object, //主要是为容器组件设置样式
    duration: {
      // css动画持续时间
      type: String,
      default: '12s'
    },
    direction: {
      // css动画滚动方向
      type: String,
      default: 'normal'
    },
    delay: {
      // css动画延迟时间
      type: String,
      default: '0s'
    }
  },
  computed: {
    // 对用户传入的属性进行扩展,可以使用Object.assign(this.barStyle,...)
    // 通过计算属性
    customStyle() {
      return {
        ...this.barStyle,
        'animation-duration': this.duration,
        'animation-direction': this.direction,
        'animation-delay': this.delay
      }
    }
  },
  methods: {
    name() {}
  },
  render(createElement) {
    // 获组件内容,并应用class
    const bar = createElement(
      'div',
      { class: 'vifnslb-bar' },
      this.$slots.default
    )
    // 生成组件容器,应用 class, style,并能够把子组件添加到容器中
    return createElement(
      'div',
      { class: ['vifnslb-container'], style: this.customStyle },
      [bar, bar]
    )
  }
}
</script>

<style scoped>
@keyframes moveSlideshow {
  100% {
    transform: translateX(-50%);
  }
}
/* 
容器组件的宽度:200%,足够的宽;固定.overflow:hidden
*/
.vifnslb-container {
  transform: translate3d(0, 0, 0); /* Hey browser, please use my GPU */
  position: relative;
  overflow: hidden;
  width: 200%;
  animation-name: moveSlideshow;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.vifnslb-bar {
  float: left;
  width: 50%;
}
</style>
