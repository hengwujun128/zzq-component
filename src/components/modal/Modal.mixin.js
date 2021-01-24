export default {
  data() {
    return {
      key: ''
    }
  },
  methods: {
    // get dragable element
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

        /* -------------------------------------------------------------------------- */
        /*                          modsedown event handlers:                         */
        /* -------------------------------------------------------------------------- */
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
    }
  }
};
