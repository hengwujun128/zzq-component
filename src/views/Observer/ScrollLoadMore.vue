<template>
  <div class="scrollLoader">
    <div class="images-wrapper">
      <div class="images-item" v-for="(image, index) of images" :key="index">
        <div class="images-card">
          <img class="images-card__image" :src="image.preview_jpg" @load="masks.push(index)">
        <!-- <div class="images-card__mask" :style="{'background-color':image.color}" v-if="!masks.includes(index)"></div> -->
        </div>
      </div>
    </div>
    <LoadMore :loaderMethod="getImageData" :loaderDisable="disable"></LoadMore>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ScrollLoadMore',
  data () {
    return {
      disable: false,
      page: 1,
      pageSize: 10,
      images: [],
      masks: [],

      common: {
        open_id: '1384471813962993664',
        token: '247e25737ed3ead7496d2fa50e5946ffc9e2e5db',
        device_id: '230d7f48beafbd5c4bf68718a12a19e0',
        player_version: 108,
        platform: 'pc'
      },
      rootEle: null
    }
  },
  watch: {
    page (value) {
      this.disable = value > 10
    }
  },
  created () {
    // this.getImageList()
    this.rootEle = document.querySelector('.scrollLoader')
  },
  methods: {
    getImageData () {
      const url = 'http://test-pcwallpaper.zhhainiao.com/v1/ugc/author/works'
      const params = {
        author_uid: 1,
        page_size: 15,
        page: this.page++,
        wallpaper_platform: 1,
        login_info: {},
        common: this.common
      }
      axios.post(url, params).then(res => {
        const result = res.data.data.list
        this.images = [...this.images, ...result]
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .scrollLoader {

    .images-wrapper {
      max-width: 1200px;
      padding-bottom: 30px;
      margin: 0 auto;
      display: flex;
      justify-content: space-evenly; // adverb 均等, 平均地；
      flex-wrap: wrap;
    }

    .images-item {
      width: 30%;
      padding: 1%;
    }

    .images-card {
      width: 100%;
      height: 0;
      padding-bottom: 70%;
      position: relative;
    }

    .images-card__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      vertical-align: middle;
    }
    .images-card__mask{
      position: absolute;
      z-index: 9;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: .8;
    }
  }
</style>

<style lang="scss" scoped>
// 对每个 item 运用 animation
  .images-item{
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: fadeInUp;
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10%) scale(0.6);
    }

    to {
      opacity: 1;
      transform: translateY(0%) scale(1.0);
    }
  }
</style>
