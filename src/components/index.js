/* eslint-disable */

import Vue from "vue"
import ZButton from "./Button.vue"
import ZBanner from "./Banner.vue"

const Components = {
  ZBanner,
  ZButton
}

// register globally in Vue 
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})


export default Components