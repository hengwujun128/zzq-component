/* eslint-disable */
// 私有对象
var _ = {
  $: function(selector) {
    return document.querySelector(selector);
  },
  // 一次为一个 dom 对象添加多个事件,但是共用一个事件处理程序;可以在事件处理程序判断事件类型
  on: function($element, events, handler) {
    if (!(events instanceof Array)) {
      events = [events];
    }
    for (var i = 0; i < events.length; i++) {
      $element.addEventListener(events[i], handler);
    }
  },
  // 一次为一个 dom移除所有事件
  off: function($element, events, handler) {
    if (!(events instanceof Array)) {
      events = [events];
    }
    for (var i = 0; i < events.length; i++) {
      $element.removeEventListener(events[i], handler);
    }
  }
};

// while 循环获取元素相对于 page 的坐标
function getScrollTopElement($element) {
  var top = 0;

  while ($element.offsetParent !== undefined && $element.offsetParent != null) {
    top +=
      $element.offsetTop +
      ($element.clientTop != null ? $element.clientTop : 0);
    $element = $element.offsetParent;
  }

  return top;
}
// 获取滚动条滚动的距离(注意:滚动条是相对于 body 而言)
function getScrollTopDocument() {
  return document.documentElement.scrollTop + document.body.scrollTop;
}

//  ScrollTo is a plugin,在 plugin 中创建一个指令
var ScrollTo = {
  install: function(Vue, config) {
    var settings = {
      speed: 1000,
      padding: 0,
      movingFrequency: 20
    };

    Object.assign(settings, config);

    function handleClick() {
      // this 指ScrollTo 对象，
      var options = this.expression.split(",");

      // 迭代去掉表达式中的单引号
      options = options.map(function(item) {
        if (typeof item !== "string") {
          return item;
        }
        return item.replace(/\'/g, "");
      });
      // 目标元素的选择器
      var selector = options[0];

      var padding =
        typeof options[1] === "string"
          ? options[1].replace(/\D/g, "")
          : settings.padding;

      // 目标 dom 元素
      var $element = _.$(selector);

      if (!$element) {
        throw new Error(
          '$element is not defined, selector="' + selector + '" '
        );
      }
      // hopCount:设置滚动完成需要多少步
      // 定义每一帧 需要的毫秒数 20ms,每秒50帧
      var hopCount = Math.ceil(settings.speed / settings.movingFrequency);
      // 滚动条的位置
      var documentScrollTop = getScrollTopDocument();
      // 目标元素距离 / 总帧数 = 每一帧要滚动的距离
      var gap =
        (getScrollTopElement($element) - documentScrollTop - padding) /
        hopCount;

      if (gap === 0) {
        // Do not scroll when current position is the same as target offset.
        return;
      }
      // 循环总帧数,每一帧滚动的距离(滚动的距离是相等的)gap * 当前步数
      //  时间,距离 和频率问题
      // 1s 之内滚动50次,50帧
      for (var i = 1; i <= hopCount; i++) {
        (function(i) {
          //  每一帧滚动的距离,都是从0开始走;
          //  每一帧需要的时间,
          //  每一步走的距离是不一样的,每一步所需时间也是不一样的,但是频率是一样的
          var hopTopPosition = gap * i;

          setTimeout(function() {
            window.scrollTo(0, hopTopPosition + documentScrollTop);
          }, settings.movingFrequency * i);
        })(i);
      }
    }
    // 在
    Vue.directive("zscroll", {
      // el：指令所绑定的元素，binding:an object
      // context is the binding
      // 所有的钩子函数会被复制到实际的**指令对象**中，而这个指令对象将会是所有钩子函数的 `this` 上下文环境。指令对象上暴露了一些有用的公开属性：
      // - **el**： 指令绑定的元素
      // - **vm**： 拥有该指令的上下文 ViewModel
      // - **expression**： 指令的表达式，不包括参数和过滤器
      // - **arg**： 指令的参数
      // - **raw**： 未被解析的原始表达式
      // - **name**： 不带前缀的指令名
      bind: function($element, context) {
        // add element an event listener by directive
        // 注意：handleClick 绑定了上下文
        _.on($element, "click", handleClick.bind(context));
      },

      unbind: function($element) {
        _.off($element, "click", handleClick);
      }
    });
  }
};

export default ScrollTo;
