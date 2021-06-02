import Vue from 'vue'
import router from './router'
import vuescroll from 'vuescroll'

import App from './App.vue'

import zzq from './components'
import Modal from './components/modal'

import LazyLoad from './components/directive/lazyLoad'

import LoadMore from './components/loadMore/index'

Vue.config.productionTip = false
Vue.use(LoadMore, {})
Vue.use(LazyLoad, {
  default: require('./assets/logo.png')
})
Vue.use(Modal, { componentName: 'ZModal', dynamic: true, dialog: true })

Vue.use(zzq)

/* -------------------------------------------------------------------------- */
/*                     // You can set global config here.                     */
/* -------------------------------------------------------------------------- */

Vue.use(vuescroll, {
  ops: {
    // The global config
  }
})

new Vue({
  router,
  render: h => h(App)
  // components: {
  //   App
  // },
}).$mount('#app')
