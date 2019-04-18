import Vue from "vue";
import App from "./App.vue";

import zzq from "./components";
import VueRx from 'vue-rx';
import VueRx from 'vue-rx';

Vue.use(VueRx);

Vue.use(VueRx);
Vue.config.productionTip = false;

Vue.use(zzq);
new Vue({
  render: h => h(App)
  // components: {
  //   App
  // },
}).$mount("#app");
