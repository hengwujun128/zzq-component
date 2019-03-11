import SequentialEntrance from "./SequentialEntrance.js";
// 含有 install 方法的 object
const VueSequentialEntrance = {
  install(Vue, options) {
    Vue.component("sequential-entrance", SequentialEntrance);
  }
};

export default VueSequentialEntrance;
