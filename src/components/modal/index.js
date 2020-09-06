/* components  */
import Modal from './Modal.vue'
import Dialog from './Dialog.vue'
import ModalsContainer from './ModalsContainer.vue'

const defaultComponentName = 'modal'

// vue实例在安装插件过程中，向自身添加了$modal 全局对象和方法
//  同时向自身添加了全局的组件 (Vue.component(xxx)),modal, v-dialog,modal-container

//  也可以添加全局的指令当前vue实例上
const Plugin = {
  install(Vue, options = {}) {
    /**
     * Makes sure that plugin can be insstalled only once
     */
    if (this.installed) {
      return
    }

    this.installed = true
    //  事件bus ,把vue实例作为plugin的一个属性
    this.event = new Vue()
    this.dynamicContainer = null
    // 自定义组件名称,否则使用默认名称 modal
    this.componentName = options.componentName || defaultComponentName

    /**
     * Plugin API  向vue实例添加全局对象和方法(同vuex )
     */
    Vue.prototype.$modal = {
      // 设置dynamic model 时候，vue会注册全局组件modals-container,
      // 在此组件中会进行调用$modal._setDynamicContainer
      _setDynamicContainer(dynamicContainer) {
        Plugin.dynamicContainer = dynamicContainer
      },

      // 第一个参数 modal 是个字符串，对应模板中 modal element 的name 属性值; 一个模板字符串也可以；或者是个组件component
      // 第二个参数paramsOrProps 是附加参数对象,能够在 modal element（modal 组件） 上的事件接收,也可以作为modal element 的props
      // 第三个params是modal参数，
      // 第四个参数是modal event listeners

      // Dynamic Modals
      show(modal, paramsOrProps, params, events = {}) {
        if (typeof modal === 'string') {
          // 第三个参数是show or hide boolean
          Plugin.event.$emit('toggle', modal, true, paramsOrProps)
        } else {
          // dynamicContainer 默认值为空
          if (Plugin.dynamicContainer === null) {
            console.warn(
              '[smart-modal] In order to render dynamic modals, a <modals-container> component must be present on the page'
            )
          } else {
            // dynamic modals
            Plugin.dynamicContainer.add(modal, paramsOrProps, params, events)
          }
        }
      },
      hide(name, params) {
        Plugin.event.$emit('toggle', name, false, params)
      },
      // toggle 使用undefined as state
      toggle(name, params) {
        Plugin.event.$emit('toggle', name, undefined, params)
      },
    }
    /**
     * 可以自定义组件名称,如果没有自定义，就是用modal 作为组件名称
     * Sets custom component name (if provided)
     */
    Vue.component(this.componentName, Modal)

    /**
     * 如果用户使用v-dialog,在安装插件的时候要给参数
     * Registration of <Dialog/> component
     */
    if (options.dialog) {
      Vue.component('v-dialog', Dialog)
    }
    /**
     * In order to instantiate modals at runtime, (for lazy-loading or decluttering templates),
     * it is possible to create modals dynamically
     * Registration of <ModalsContainer/> component
     *
     * 运行时，使用modalsContainer 组件，加入到全局组件
     *
     */
    if (options.dynamic) {
      Vue.component('modals-container', ModalsContainer)
    }
  },
}

export default Plugin
