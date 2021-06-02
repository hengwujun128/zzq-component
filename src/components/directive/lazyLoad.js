/*
思路:
1.判断当前图片是否到了可视区域
2.拿到所有图片的 dom,遍历每个图片,判断当前图片是否到了可视区域
3.如果到了就设置图片的 src 属性,否则显示默认图片
*/

/**
todo: 1. bind hook 设置image的 src和 data-src
fix:  2. inserted: 为每个绑定当前指令的 dom 都 new 一个IntersectionObsrver()
 */
const LazyLoad = {
  install (Vue, options) {
    const defaultSrc = options.default
    Vue.directive('lazy', {
      // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      bind (el, binding) {
        LazyLoad.init(el, binding.value, defaultSrc)
      },
      // 当被绑定的元素插入到 DOM 中时……
      inserted (el) {
        if (IntersectionObserver) {
          LazyLoad.observe(el)
          // LazyLoad.listenScroll(el)
        } else {
          // 为window 添加 scroll 事件
          LazyLoad.listenScroll(el)
        }
      }
    })
  },
  // initialization: 为绑定的元素设置 data-src,src
  init (el, val, defaultSrc) {
    el.setAttribute('data-src', val)
    el.setAttribute('src', defaultSrc)
  },
  // observe current dom
  observe (el) {
    // entries 是个数组,数组的长度是我们监视目标元素的个数
    const io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      // 当前元素出现在 viewPort 中时候
      console.log('intersectionRatio', entries[0].intersectionRatio)
      // if (entries[0].isIntersecting) {
      //   if (realSrc) {
      //     el.src = realSrc
      //     // 删除的目的:是为进入 viewpoint再次触发赋值
      //     el.removeAttribute('data-src')
      //   }
      // }
      if (entries[0].intersectionRatio > 0) {
        console.log('in the view')
        el.src = realSrc
        // 停止目标元素的观察
        io.unobserve(entries[0].target)
      } else {
        console.log('out of view')
      }
    })
    // 开始观察目标元素
    io.observe(el)
  },
  // 通过滚动事件进行监听
  listenScroll (el) {
    const handler = LazyLoad.throttle(LazyLoad.load, 300)
    window.addEventListener('scroll', () => {
      handler(el)
    })
    LazyLoad.load(el)
  },
  // 加载真实图片
  load (el) {
    // debugger
    const windowHeight = document.documentElement.clientHeight
    const elTop = el.getBoundingClientRect().top
    const elBottom = el.getBoundingClientRect().bottom
    const realSrc = el.dataset.src
    // 元素呈现的条件: elBottom > 0 && elTop - windowHeight<0
    if (elTop - windowHeight < 0 && elBottom > 0) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  },
  // throttle: 单位时间内,触发多次 action,但是只执行一次,执行的是第一次
  throttle (fn, delay) {
    let valid = true
    return function (...args) {
      const context = this
      if (!valid) {
        return false
      }
      valid = false
      setTimeout(() => {
        fn.apply(context, args)
        valid = true
      }, delay)
    }
  }
}

/* --------------------------- optimizing loadMore -------------------------- */

let IOInstance
const lazyLoadImg = {
  install: (Vue, options) => {
    const defaultSrc = options.default

    Vue.directive('lazyLoadImg', {
      bind (el, binding) {
        lazyLoadImg.init(el, binding.value, defaultSrc)
      },
      // 当被绑定的元素插入到 DOM 中时……
      inserted (el) {
        if (IntersectionObserver) {
          lazyLoadImg.observe(el)
          // LazyLoad.listenScroll(el)
        }
      }
    })
  },
  // initialization: 为绑定的元素设置 data-src,src
  init (el, val, defaultSrc) {
    el.setAttribute('data-src', val)
    el.setAttribute('src', defaultSrc)
  },
  observe (el) {
    // entries 是个数组,数组的长度是我们监视目标元素的个数
    if (!IOInstance) {
      IOInstance = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const realSrc = el.dataset.src
          // 当前元素出现在 viewPort 中时候
          console.log('intersectionRatio', entry.intersectionRatio)
          // if (entries[0].isIntersecting) {
          //   if (realSrc) {
          //     el.src = realSrc
          //     // 删除的目的:是为进入 viewpoint再次触发赋值
          //     el.removeAttribute('data-src')
          //   }
          // }
          if (entry.intersectionRatio > 0) {
            console.log('in the view')
            el.src = realSrc
            // 停止目标元素的观察
            IOInstance.unobserve(entry.target)
          } else {
            console.log('out of view')
          }
        })
      })
    }
    // 开始观察目标元素
    IOInstance.observe(el)
  }
}

export { lazyLoadImg }
export default LazyLoad
