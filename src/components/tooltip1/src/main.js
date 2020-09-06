import Popper from "/src/utils/vue-popper"
import debounce from "throttle-debounce/debounce"
import { addClass, removeClass, on, off } from "/src/utils/dom"
import { generateId } from "/src/utils/util"
import Vue from "vue"

export default {
  name: "ElTooltip",

  mixins: [Popper],

  props: {
    //延迟出现，单位毫秒
    openDelay: {
      type: Number,
      default: 0
    },
    // Tooltip 是否可用
    disabled: Boolean,
    //手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效
    manual: Boolean,
    //默认提供的主题
    effect: {
      type: String,
      default: "dark"
    },
    // ......................箭头的偏移
    arrowOffset: {
      type: Number,
      default: 0
    },
    //为 Tooltip 的 popper 添加类名
    popperClass: String,
    // 显示的内容，也可以通过 slot#content 传入 DOM
    content: String,
    //是否显示 Tooltip 箭头，更多参数可见Vue-popper
    visibleArrow: {
      default: true
    },
    //定义渐变动画
    transition: {
      type: String,
      default: "el-fade-in-linear"
    },
    //popper.js 的参数
    popperOptions: {
      default() {
        return {
          boundariesPadding: 10,
          gpuAcceleration: false
        }
      }
    },
    //鼠标是否可进入到 tooltip 中: true
    enterable: {
      type: Boolean,
      default: true
    },
    //Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏
    hideAfter: {
      type: Number,
      default: 0
    },
    //Tooltip 组件的 tabindex
    tabindex: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      tooltipId: `el-tooltip-${generateId()}`,
      timeoutPending: null,
      focusing: false
    }
  },
  //
  beforeCreate() {
    if (this.$isServer) return
    // 定义个 vue 实例,其实就死一个 vue组件
    this.popperVM = new Vue({
      data: { node: "" },
      render(h) {
        return this.node
      }
    }).$mount()

    this.debounceClose = debounce(200, () => this.handleClosePopper())
  },

  render(h) {
    if (this.popperVM) {
      this.popperVM.node = (
        <transition name={this.transition} onAfterLeave={this.doDestroy}>
          <div
            onMouseleave={() => {
              this.setExpectedState(false)
              this.debounceClose()
            }}
            onMouseenter={() => {
              this.setExpectedState(true)
            }}
            ref='popper'
            role='tooltip'
            id={this.tooltipId}
            aria-hidden={this.disabled || !this.showPopper ? "true" : "false"}
            v-show={!this.disabled && this.showPopper}
            class={[
              "el-tooltip__popper",
              "is-" + this.effect,
              this.popperClass
            ]}
          >
            {/*获取插槽中的内容 */}
            {this.$slots.content || this.content}
          </div>
        </transition>
      )
    }

    const firstElement = this.getFirstElement()
    if (!firstElement) return null

    const data = (firstElement.data = firstElement.data || {})
    data.staticClass = this.addTooltipClass(data.staticClass)

    return firstElement
  },

  mounted() {
    this.referenceElm = this.$el
    if (this.$el.nodeType === 1) {
      this.$el.setAttribute("aria-describedby", this.tooltipId)
      this.$el.setAttribute("tabindex", this.tabindex)
      on(this.referenceElm, "mouseenter", this.show)
      on(this.referenceElm, "mouseleave", this.hide)
      on(this.referenceElm, "focus", () => {
        if (!this.$slots.default || !this.$slots.default.length) {
          this.handleFocus()
          return
        }
        const instance = this.$slots.default[0].componentInstance
        if (instance && instance.focus) {
          instance.focus()
        } else {
          this.handleFocus()
        }
      })
      on(this.referenceElm, "blur", this.handleBlur)
      on(this.referenceElm, "click", this.removeFocusing)
    }
    // fix issue https://github.com/ElemeFE/element/issues/14424
    if (this.value && this.popperVM) {
      this.popperVM.$nextTick(() => {
        if (this.value) {
          this.updatePopper()
        }
      })
    }
  },
  watch: {
    focusing(val) {
      if (val) {
        addClass(this.referenceElm, "focusing")
      } else {
        removeClass(this.referenceElm, "focusing")
      }
    }
  },
  methods: {
    show() {
      this.setExpectedState(true)
      this.handleShowPopper()
    },

    hide() {
      this.setExpectedState(false)
      this.debounceClose()
    },
    handleFocus() {
      this.focusing = true
      this.show()
    },
    handleBlur() {
      this.focusing = false
      this.hide()
    },
    removeFocusing() {
      this.focusing = false
    },

    addTooltipClass(prev) {
      if (!prev) {
        return "el-tooltip"
      } else {
        return "el-tooltip " + prev.replace("el-tooltip", "")
      }
    },

    handleShowPopper() {
      if (!this.expectedState || this.manual) return
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.showPopper = true
      }, this.openDelay)

      if (this.hideAfter > 0) {
        this.timeoutPending = setTimeout(() => {
          this.showPopper = false
        }, this.hideAfter)
      }
    },

    handleClosePopper() {
      if ((this.enterable && this.expectedState) || this.manual) return
      clearTimeout(this.timeout)

      if (this.timeoutPending) {
        clearTimeout(this.timeoutPending)
      }
      this.showPopper = false

      if (this.disabled) {
        this.doDestroy()
      }
    },

    setExpectedState(expectedState) {
      if (expectedState === false) {
        clearTimeout(this.timeoutPending)
      }
      this.expectedState = expectedState
    },

    getFirstElement() {
      const slots = this.$slots.default
      if (!Array.isArray(slots)) return null
      let element = null
      for (let index = 0; index < slots.length; index++) {
        if (slots[index] && slots[index].tag) {
          element = slots[index]
        }
      }
      return element
    }
  },

  beforeDestroy() {
    this.popperVM && this.popperVM.$destroy()
  },

  destroyed() {
    const reference = this.referenceElm
    if (reference.nodeType === 1) {
      off(reference, "mouseenter", this.show)
      off(reference, "mouseleave", this.hide)
      off(reference, "focus", this.handleFocus)
      off(reference, "blur", this.handleBlur)
      off(reference, "click", this.removeFocusing)
    }
  }
}
