/* eslint-disable */

// import Vue from "vue";
import ZButton from "./Button.vue"
import ZBanner from "./Banner.vue"

// functional component
import SequentialEntrance from "./sequential"
import SequentialStyle from "./sequential/style.scss"
import InfiniteScroll from "./InfiniteScroll"
import Tooltip from "./tooltip"

// directive
import ZScroll from "./directive/scroll.js"

export const Components = {
  ZBanner,
  ZButton,
  SequentialEntrance,
  InfiniteScroll,
  Tooltip
}

export const Directives = {
  ZScroll
}

// export globally
export default {
  install(Vue, options) {
    // register globally in Vue
    Object.keys(Components).forEach(name => {
      Vue.component(name, Components[name])
    })
    // 指令
    Object.keys(Directives).forEach(name => {
      Vue.directive(name, Directives[name])
      // debugger;
    })
  }
}
