<template>
  <div id="modals-container">
    <!-- modal 为全局组件，直接可以使用 -->
    <ZModal
      v-for="modal in modals"
      :key="modal.id"
      v-bind="modal.config"
      v-on="modal.events"
      @closed="remove(modal.id)"
    >
      <!--  在 modal 中使用动态组件-->
      <component
        :is="modal.component"
        v-bind="modal.params"
        @close="$modal.hide(modal.config.name)"
      />
    </ZModal>
  </div>
</template>
<script>
export default {
  name: 'ModalsContainer',
  data() {
    return {
      uid: 0,
      modals: [],
    }
  },
  created() {
    this.$modal._setDynamicContainer(this)
  },
  mounted() {},
  methods: {
    add(modal, params, config, events) {
      const id = this.uid++
      config = config ? Object.assign({}, config) : {}
      if (!config.name) {
        config.name = '_dynamic-modal-' + id
      }
      this.modals.push({
        id: id,
        component: modal,
        params: params || {},
        config: config,
        events: events,
      })
      this.$nextTick(() => {
        this.$modal.show(config.name)
      })
    },
    remove(id) {
      for (const i in this.modals) {
        if (this.modals[i].id === id) {
          this.modals.splice(i, 1)
          return
        }
      }
    },
  },
}
</script>
