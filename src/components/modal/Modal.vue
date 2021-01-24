<template>
  <!-- 根组件使用 transition-->
  <transition name="overlay-fade">
    <!-- 先控制overlay的显示隐藏 -->
    <!-- 通过计算属性设置overlayClass 属性,就是背景层,fix 定位,全屏, -->
    <!-- aria-expanded  -->
    <!-- data-modal 在overlay上加上modal的名称-->
    <div
      v-if="visibility.overlay"
      ref="overlay"
      :class="overlayClass"
      :aria-expanded="visible.toString()"
      :data-modal="name"
      @click="overlayHandler"
    >
      <!-- 在overlay 上加一个div 用于控制overlay的点击事件,就是modal 背景的点击事件 -->
      <!-- 这个div高度宽度和overlay一致，保证点击范围，主要是关闭overlay和modal -->
      <!-- 阻止事件冒泡到overlay,用mousedown替代click -->
      <div
        :class="backgroundClickClass"
        @mousedown.stop="onBackgroundClick"
        @touchstart.stop="onBackgroundClick"
      >
        <!-- 关闭按钮，类似youtube -->
        <div class="v--modal-top-right">
          <slot name="top-right" />
        </div>

        <!-- modal 主体 -->
        <transition :name="transition">
          <div
            v-if="visibility.modal"
            ref="modal"
            :class="modalClass"
            :style="modalStyle"
            @mousedown.stop
            @touchstart.stop
          >
            <slot />
            <resizer
              v-if="resizable && !isAutoHeight"
              :min-width="minWidth"
              :min-height="minHeight"
              @resize="onModalResize"
            />
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
// 引用plugin,这里存在相互引用
import Modal from "./index";
// 事件处理程序组件
import Resizer from "./Resizer.vue";

import { inRange } from "./util";
import parseNumber from "./parser"; // parser.js 使用export default，因此可以改变名称

export default {
  name: "modal",
  components: {
    Resizer
  },
  // eighteen property
  props: {
    name: {
      required: true,
      type: String
    },
    delay: {
      type: Number,
      default: 0
    },
    //If true, allows resizing the modal window, keeping it in the center of the window
    resizable: {
      type: Boolean,
      default: false
    },
    //If true, modal box will try to adapt to the window size
    /*
     * 如果是 adaptive为 true,就是说 modal 的宽高要和 window 的 size匹配
     * 1. 不同的机型的 window 大小是不同的,
     * 2. 该属性配合 this.minWidth, window.width ,是个 range 值 ,
     * 3. 当 resize modal 的 时候, this.minWidth 非常有用, 不能极端的 resize modal 的宽度
     * 4.
     * */
    adaptive: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: [Boolean, String],
      default: false
    },
    /*
     * If height property is auto and the modal height exceeds window height
     * - you will be able to scroll modal
     * */
    scrollable: {
      type: Boolean,
      default: false
    },
    // Resets position and size before showing modal
    reset: {
      type: Boolean,
      default: false
    },
    //Transition name
    transition: {
      type: String
    },
    //If set to false, it will not be possible to close modal by clicking on the background
    clickToClose: {
      type: Boolean,
      default: true
    },
    // Classes that will be applied to the modal box, if not specified,
    // the default v--modal class will be applied
    classes: {
      type: [String, Array],
      default: "v--modal"
    },

    minWidth: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0;
      }
    },
    minHeight: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0;
      }
    },
    maxWidth: {
      type: Number,
      default: Infinity
    },
    maxHeight: {
      type: Number,
      default: Infinity
    },
    width: {
      type: [Number, String],
      default: 600,
      // 对传入的值做类型校验,返回true,false
      validator(value) {
        if (typeof value === "string") {
          const width = parseNumber(value);
          console.log(width);
          return (width.type === "%" || width.type === "px") && width.value > 0;
        }

        return value >= 0;
      }
    },
    height: {
      type: [Number, String],
      default: 300,
      validator(value) {
        if (typeof value === "string") {
          if (value === "auto") {
            return true;
          }

          const height = parseNumber(value);
          return (
            (height.type === "%" || height.type === "px") && height.value > 0
          );
        }

        return value >= 0;
      }
    },
    pivotX: {
      //n. 枢；中心；旋转
      type: Number,
      default: 0.5,
      validator(value) {
        return value >= 0 && value <= 1;
      }
    },
    pivotY: {
      type: Number,
      default: 0.5,
      validator(value) {
        return value >= 0 && value <= 1;
      }
    }
  },
  data() {
    return {
      visible: false,
      // 初始化不可见
      visibility: {
        modal: false,
        overlay: false
      },
      // 初始化偏移量，当组件draggable为true时候，可以用到
      shift: {
        left: 0,
        top: 0
      },
      // 设置modal 的宽和高,单位
      modal: {
        width: 0,
        widthType: "px",
        height: 0,
        heightType: "px",
        renderedHeight: 0
      },
      //  设置 wondow 对象的宽高
      window: {
        width: 0,
        height: 0
      },
      mutationObserver: null
    };
  },
  computed: {
    /**
     * Returns true if height is set to "auto"
     * 高度是自定义
     */
    isAutoHeight() {
      //
      return this.modal.heightType === "auto";
    },
    /**
     * Calculates and returns modal position based on the
     * pivots, window size and modal size
     * 精准控制 modal 位置,更具拖拽
     */
    position() {
      const {
        window, // active property
        shift, // active property 初始化偏移量，当组件draggable为true时候，可以用到
        pivotX, // x 轴上偏移 0.5
        pivotY, // y 轴上偏移 0.5
        trueModalWidth,
        trueModalHeight
      } = this;
      // 父元素和子元素的宽高差值
      const maxLeft = window.width - trueModalWidth;
      const maxTop = window.height - trueModalHeight;
      // 默认水平垂直居中, 加上shift.left,shift.top
      const left = shift.left + pivotX * maxLeft;
      const top = shift.top + pivotY * maxTop;
      return {
        left: inRange(0, maxLeft, left),
        top: inRange(0, maxTop, top)
      };
    },
    /**
     * Returns pixel width (if set with %) and makes sure that modal size
     * fits the window
     */
    trueModalWidth() {
      const { window, modal, adaptive, minWidth, maxWidth } = this;
      // 百分比是相对于窗口而言, make sure that modal size fits the window
      const value =
        modal.widthType === "%"
          ? (window.width / 100) * modal.width
          : modal.width;
      // modal 的 最大的宽度就是 window.width
      const max = Math.min(window.width, maxWidth);
      // 如果是自适应()那么 modal 的宽度就是在一个 range 中
      return adaptive ? inRange(minWidth, max, value) : value;
    },
    /**
     * Returns pixel height (if set with %) and makes sure that modal size
     * fits the window.
     *
     * Returns modal.renderedHeight if height set as "auto"
     */
    trueModalHeight() {
      const { window, modal, isAutoHeight, adaptive, maxHeight } = this;

      const value =
        modal.heightType === "%"
          ? (window.height / 100) * modal.height
          : modal.height;

      if (isAutoHeight) {
        // use renderedHeight when height 'auto'
        return this.modal.renderedHeight;
      }

      const max = Math.min(window.height, maxHeight);

      return adaptive ? inRange(this.minHeight, max, value) : value;
    },
    /**
     * Returns class list for screen overlay (modal background)
     */
    overlayClass() {
      // control show or hide ,and scrollable
      return {
        "v--modal-overlay": true,
        scrollable: this.scrollable && this.isAutoHeight
      };
    },
    /**
     * Returns class list for click outside overlay (background click)
     */
    backgroundClickClass() {
      return ["v--modal-background-click"];
    },
    /**
     * Returns class list for modal itself
     */
    modalClass() {
      return ["v--modal-box", this.classes];
    },
    /**
     * CSS styles for position and size of the modal
     */
    modalStyle() {
      // 用于精准控制modal 样式
      return {
        top: this.position.top + "px",
        left: this.position.left + "px",
        width: this.trueModalWidth + "px",
        height: this.isAutoHeight ? "auto" : this.trueModalHeight + "px"
      };
    },
    //
    modalHeaderClass() {
      return this.draggable ? "v--modal-header" : "";
    }
  },
  watch: {
    /**
     * Sets the visibility of overlay and modal.
     * Events 'opened' and 'closed' is called here
     * inside `setTimeout` and `$nextTick`, after the DOM changes.
     * This fixes `$refs.modal` `undefined` bug (fixes #15)
     */
    // 通过监听 visible 的值来决定显示隐藏
    visible(value) {
      // show,先show overlay,在modal，最后添加事件处理程序
      if (value) {
        this.visibility.overlay = true;
        // show overlay first ,then show modal;this.delay value 0
        setTimeout(() => {
          this.visibility.modal = true;
          // 在 数据驱动导致视图变化之后，dom重新渲染之后再添加事件处理程序
          this.$nextTick(() => {
            // 添加可以拖拽event handler
            this.addDraggableListeners();
            // 主要做两件事：1.根据显示状态添加modal容器元素dom监听；2.发射opend（打开之后的回调），closed 事件；
            this.callAfterEvent(true);
          });
        }, this.delay);
      } else {
        // 如果隐藏，先隐藏modal;再隐藏overlay
        this.visibility.modal = false;

        setTimeout(() => {
          this.visibility.overlay = false;
          this.$nextTick(() => {
            this.removeDraggableListeners();
            // 主要做两件事：1.根据显示状态添加modal容器元素dom监听；2.发射opend（打开之后的回调），closed 事件；
            this.callAfterEvent(false);
          });
        }, this.delay);
      }
    }
  },
  created() {
    this.setInitialSize();
  },
  /**
   * Sets global listeners
   */
  beforeMount() {
    // Model come from pulgin，全局的监听，通过bus 设置
    // 用户通过this.$modal.show() 就会触发此事件
    // 添加事件监听也是通过 event bus
    Modal.event.$on("toggle", (name, state, params) => {
      // this.name 用户通过props传入
      // name 也是用户通过this.$modal.show('name',...)第一个参数;这两个值要相同
      if (name === this.name) {
        // 在 plugin 中设置,表示toggle 状态，单独处理
        if (typeof state === "undefined") {
          state = !this.visible;
        }
        // 把用户传入的paramsOrProps 带入
        // 主要做了两件事：1.添加beforeEvent 事件，以后再自己的组件中监听；
        // 2.改变了this.visible 的值，触发了监听
        this.toggle(state, params);
      }
    });

    // 重置 this.window对象的大小，resize 的时候设置；这里也要设置
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
    /**
     * Making sure that autoHeight is enabled when using "scrollable"
     */

    //scrollable : 就是 modal 的 height 大于 screen 的高度,允许 modal scrollable
    //Enables scroll within the modal when the height of the modal is greater than the screen.
    if (this.scrollable && !this.isAutoHeight) {
      console.warn(
        `Modal "${this.name}" has scrollable flag set to true ` +
          `but height is not "auto" (${this.height})`
      );
    }
    /**
     * Only observe when using height: 'auto'
     * The callback will be called when modal DOM changes,
     * this is for updating the `top` attribute for height 'auto' modals.
     */
    if (this.isAutoHeight) {
      /**
       * MutationObserver feature detection:
       * Detects if MutationObserver is available, return false if not.
       * No polyfill is provided here, so height 'auto' recalculation will
       * simply stay at its initial height (won't crash).
       * (Provide polyfill to support IE < 11)
       */

      // mutationObserve 判断浏览器是否支持mutationObserve
      const MutationObserver = (function() {
        const prefixes = ["", "WebKit", "Moz", "O", "Ms"];

        for (let i = 0; i < prefixes.length; i++) {
          const name = prefixes[i] + "MutationObserver";

          if (name in window) {
            return window[name];
          }
        }
        return false;
      })();
      // 如果浏览器支持mutationObserve ,就实例化，并赋值给一个响应式属性
      // 回调函数的参数：mutations 是一个集合
      if (MutationObserver) {
        this.mutationObserver = new MutationObserver(mutations => {
          this.updateRenderedHeight();
        });
      }
    }
    // 添 ESC 的事件处理
    if (this.clickToClose) {
      window.addEventListener("keyup", this.onEscapeKeyUp);
    }
  },
  /**
   * Removes "resize" window listener
   */
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);

    if (this.clickToClose) {
      window.removeEventListener("keyup", this.onEscapeKeyUp);
    }
  },
  methods: {
    /**
     * Initializes modal's size & position,
     * if "reset" flag is set to true - this function will be called
     * every time "beforeOpen" is triggered
     */
    setInitialSize() {
      // 对象结构赋值,获取this.modal对象；this.modal 是个active 属性
      // 并对modal 对象进行初始化设置,初始化宽高
      const { modal } = this;
      // 把 pros 中的属性值 传递给 data 属性,这样方便改动 data 中的值
      const width = parseNumber(this.width);
      const height = parseNumber(this.height);

      modal.width = width.value;
      modal.widthType = width.type;
      modal.height = height.value;
      modal.heightType = height.type;
    },
    // esc 上添加事件
    onEscapeKeyUp(event) {
      if (event.which === 27 && this.visible) {
        // 在组件之内调用全局方法
        this.$modal.hide(this.name);
      }
    },
    // 重置窗口大小
    onWindowResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },

    /**
     * Generates event object
     *
     *
     */
    genEventObject(params) {
      const eventData = {
        name: this.name,
        timestamp: Date.now(),
        canceled: false,
        ref: this.$refs.modal
      };
      // 对象的合并
      return Object.assign(eventData, params || {});
    },
    /**
     * Event handler which is triggered on modal resize
     */
    onModalResize(event) {
      this.modal.widthType = "px";
      this.modal.width = event.size.width;

      this.modal.heightType = "px";
      this.modal.height = event.size.height;

      const { size } = this.modal;
      const resizeEvent = this.genEventObject({ size });

      this.$emit("resize", resizeEvent);
    },
    /**
     *1.
     *2.再此处添加before-event handler,根据当前组件的显示隐藏状态添加
     *
     * Event handler which is triggered on $modal.show and $modal.hide
     * BeforeEvents: ('before-close' and 'before-open') are `$emit`ed here,
     * but AfterEvents ('opened' and 'closed') are moved to `watch.visible`.
     */
    toggle(state, params) {
      // 通过对象解构赋值，取出对象属性赋值给变量只做判断
      const { reset, scrollable, visible } = this;
      // 如果当前的modal 组件已经处于显示和隐藏状态，就不需要再设置
      if (visible === state) return;
      // 设置钩子,如果当前状态是visible,则设置关闭前钩子before-close
      const beforeEventName = visible ? "before-close" : "before-open";
      // before-open 要做的事件，visible 为false，当前model 为隐藏状态
      if (beforeEventName === "before-open") {
        /**
         * Need to unfocus previously focused element, otherwise
         * all keypress events (ESC press, for example) will trigger on that element.
         */
        // 移除焦点事件
        if (document.activeElement) {
          document.activeElement.blur();
        }
        // 因为是显示和隐藏状态，打开之前要initialization，位置和大小
        // Resets position and size before showing modal
        if (reset) {
          this.setInitialSize();
          this.shift.left = 0;
          this.shift.top = 0;
        }
        // 如果设置了scrollable,再次打开之前，要设置为overflow:hidden，也就是不滚动
        if (scrollable) {
          document
            .getElementsByTagName("html")[0]
            .classList.add("v--modal-block-scroll");
          document.body.classList.add("v--modal-block-scroll");
        }
      } else {
        // 关闭之前,要移除样式
        if (scrollable) {
          document
            .getElementsByTagName("html")[0]
            .classList.remove("v--modal-block-scroll");
          document.body.classList.remove("v--modal-block-scroll");
        }
      }

      let stopEventExecution = false;

      // 发射事件，传递一个回调
      const stop = () => {
        stopEventExecution = true;
      };
      //  this.genEventObject()返回一个object 对象
      const beforeEvent = this.genEventObject({ stop, state, params });
      // 发射before 钩子事件,可以在使用这个 modal组件上添加监听,可以做一些初始化的动作
      this.$emit(beforeEventName, beforeEvent);
      // 设置 显示隐藏状态，把state 赋值给响应式属性,此时会触发监听
      if (!stopEventExecution) {
        this.visible = state;
        // after events are called in `watch.visible`
      }
    },

    // 获取拖拽的容器元素
    getDraggableElement() {
      // this.draggable default value is false, 如果是boolean，.v--modal-box 设置为拖拽容器
      // 只要是boolean，则设置拖拽
      var selector =
        typeof this.draggable !== "string" ? ".v--modal-box" : this.draggable;

      if (selector) {
        // overlay 下的 .v--modal-box 的元素
        const handler = this.$refs.overlay.querySelector(selector);

        if (handler) {
          return handler;
        }
      }
    },
    /**
     * Event handler that is triggered when background overlay is clicked
     */
    onBackgroundClick() {
      if (this.clickToClose) {
        this.toggle(false);
      }
    },

    // 添加drag event handler,主要是通过鼠标事件来模拟 拖拽事件
    addDraggableListeners() {
      // 默认不可以拖拽，如果用户设置为true，则可以拖拽
      if (!this.draggable) {
        return;
      }
      // 返回拖拽的dom容器元素
      const dragger = this.getDraggableElement();

      if (dragger) {
        let startX = 0;
        let startY = 0;
        let cachedShiftX = 0;
        let cachedShiftY = 0;

        const getPosition = event => {
          return event.touches && event.touches.length > 0
            ? event.touches[0]
            : event;
        };
        // modsedown event handlers:

        const mousedown = event => {
          const target = event.target;

          if (target && target.nodeName === "INPUT") {
            return;
          }
          // 通过event 获取相对于 client 的 坐标,在mousedown 获取初始化坐标，并添加mouseMove和mouseup 事件处理程序
          const { clientX, clientY } = getPosition(event);

          document.addEventListener("mousemove", mousemove);
          document.addEventListener("mouseup", mouseup);

          document.addEventListener("touchmove", mousemove);
          document.addEventListener("touchend", mouseup);

          startX = clientX;
          startY = clientY;
          cachedShiftX = this.shift.left;
          cachedShiftY = this.shift.top;

          //  event.preventDefault()
        };

        // mousemove event handler： 主要是通过event 来获取鼠标坐标，并计算偏移
        // 这一步的操作应该在mouseUp中处理
        const mousemove = event => {
          const { clientX, clientY } = getPosition(event);

          this.shift.left = cachedShiftX + clientX - startX;
          this.shift.top = cachedShiftY + clientY - startY;
          event.preventDefault();
        };
        // 鼠标放下事件只是 移除 eventHandler
        const mouseup = event => {
          document.removeEventListener("mousemove", mousemove);
          document.removeEventListener("mouseup", mouseup);

          document.removeEventListener("touchmove", mousemove);
          document.removeEventListener("touchend", mouseup);

          event.preventDefault();
        };

        dragger.addEventListener("mousedown", mousedown);
        dragger.addEventListener("touchstart", mousedown);
      }
    },

    removeDraggableListeners() {
      //  console.log('removing draggable handlers')
    },

    /**
     * 'opened' and 'closed' events are `$emit`ed here.
     * This is called in watch.visible.
     * Because modal DOM updates are async,
     * wrapping afterEvents in `$nextTick` fixes `$refs.modal` undefined bug.
     * (fixes #15)
     */
    callAfterEvent(state) {
      // 如果是显示状态，modal 容器内部元素有变化就添加监听;否则就取消监听
      if (state) {
        this.connectObserver();
      } else {
        this.disconnectObserver();
      }
      // state :true/false,当用户this.$modal.show()的时候设置
      //
      const eventName = state ? "opened" : "closed";
      const event = this.genEventObject({ state });

      this.$emit(eventName, event);
    },

    /**
     * Update $data.modal.renderedHeight using getBoundingClientRect.
     * This method is called when:
     * 1. modal opened
     * 2. MutationObserver's observe callback
     */
    updateRenderedHeight() {
      if (this.$refs.modal) {
        this.modal.renderedHeight = this.$refs.modal.getBoundingClientRect().height;
      }
    },

    /**
     * Start observing modal's DOM, if childList or subtree changes,
     * the callback (registered in beforeMount) will be called.
     */
    connectObserver() {
      if (this.mutationObserver) {
        // 观察 thsi.$refs.modal 是否变化;
        // this.mutationObserve 有三个方法:observe(),disconnect(),takeRecords();
        // {xx}  specifies which DOM mutations should be reported.
        this.mutationObserver.observe(this.$refs.modal, {
          childList: true,
          attributes: true,
          subtree: true
        });
      }
    },

    /**
     * Disconnects MutationObserver
     */
    disconnectObserver() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }
    },
    overlayHandler() {
      // 冒泡测试,stop 修饰符不能阻止
    }
  }
};
</script>
<style lang="scss" scoped>
.v--modal-block-scroll {
  overflow: hidden;
  width: 100vw;
}

.v--modal-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  opacity: 1;
}

.v--modal-overlay.scrollable {
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

// width and height is equal to  parent div (overlay)
.v--modal-overlay .v--modal-background-click {
  min-height: 100%;
  width: 100%;
  padding-bottom: 10px;
}

.v--modal-overlay .v--modal-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.v--modal-overlay.scrollable .v--modal-box {
  margin-bottom: 2px;
  /* transition: top 0.2s ease; */
}

.v--modal {
  background-color: white;
  text-align: left;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
  padding: 0;
}

.v--modal.v--modal-fullscreen {
  width: 100vw;
  height: 100vh;
  margin: 0;
  left: 0;
  top: 0;
}

.v--modal-top-right {
  // 绝对定位到又top-right corner
  display: block;
  position: absolute;
  right: 0;
  top: 0;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.2s;
}

.overlay-fade-enter,
.overlay-fade-leave-active {
  opacity: 0;
}

.nice-modal-fade-enter-active,
.nice-modal-fade-leave-active {
  transition: all 0.4s;
}

.nice-modal-fade-enter,
.nice-modal-fade-leave-active {
  opacity: 0;
  transform: translateY(-20px);
}

.v--modal-header {
  // background: #69caf5;
  background: #029be7;
  color: #ffffff;
  font-size: 18px;
  /* cursor: move; */
  padding: 10px;

  a {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 36px;
    margin-left: 50px;
    text-decoration: none;
    display: block;
    color: #dddddd;

    &:hover {
      color: #f1f1f1;
    }
  }
}

.v--modal-footer {
  padding: 20px;
  padding-top: 10px;
  text-align: right;
  box-sizing: border-box;
}
</style>
