<template>
  <div>
    <virtual-list class="wrapper" style="height: 660px; overflow-y: auto;"
      :data-key="'wid'"
      :data-sources="items"
      :keeps="15"
      :data-component="itemComponent"
      v-on:tobottom="onScrollToBottom"
    >
      <div slot="footer" class="loading-spinner">Loading ...</div>
    </virtual-list>
  </div>
</template>

<script>
import Item from './Item.vue'
import VirtualList from 'vue-virtual-scroll-list'
import axios from 'axios'

export default {
  name: 'root',
  data () {
    return {
      itemComponent: Item,
      items: [],
      pageSize: 10,
      pageNum: 1
    }
  },
  components: {
    VirtualList
  },
  mounted () {
    this.onScrollToBottom()
  },
  methods: {
    getPageData () {
      const url = 'http://test3-pcwallpaper.zhhainiao.com/v1/ugc/author/works'
      const params = {
        author_uid: 1,
        page_size: 15,
        page: this.pageNum++,
        wallpaper_platform: 1,
        login_info: {},
        wtype_support: 0,
        common: this.common
      }
      return axios.post(url, params).then(res => {
        const result = res.data.data.list
        return result
      }).catch(error => {
        console.log(error)
      })
    },
    async onScrollToBottom () {
      const data = await this.getPageData()
      this.items = this.items.concat(data)
    }
  }

}
</script>
<style lang="scss" scoped>
.wrapper {
  background: #dddddd;
}
</style>
