import LoadMore from './LoadMore.vue'

const Plugin = {
  install: function (Vue, options = {}) {
    Vue.component(LoadMore.name, LoadMore)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}

export default Plugin
