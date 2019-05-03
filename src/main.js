import Vue from "vue"
import App from "./App.vue"

import zzq from "./components"

Vue.config.productionTip = false

Vue.use(zzq)
new Vue({
  render: h => h(App)
  // components: {
  //   App
  // },
}).$mount("#app")
