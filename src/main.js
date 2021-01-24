import Vue from "vue";
import router from './router'

import App from "./App.vue";

import zzq from "./components";
import Modal from "./components/modal";

Vue.config.productionTip = false;

Vue.use(Modal, { componentName: "ZModal", dynamic: true ,dialog:true});

Vue.use(zzq);
new Vue({
  router,
  render: h => h(App)
  // components: {
  //   App
  // },
}).$mount("#app");
