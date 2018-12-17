/* eslint-disable */

import Vue from "vue"
import ZButton from "./Button.vue"
import ZBanner from "./Banner.vue"

// directive
import ZScroll from "./directive/scroll.js"
const Components = {
  ZBanner,
  ZButton
}

// register globally in Vue 
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

const Directives = {
  ZScroll
}
Object.keys(Directives).forEach(name => {
  Vue.use(Directives[name])
})


// register scopded in component
export default Components
// 暂不支持指令的自定义注入
// export default {
//   Components,
//   Directives
// }