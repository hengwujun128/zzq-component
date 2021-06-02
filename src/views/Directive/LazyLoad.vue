<template>
  <div class="lazyLoad">
    <h2>image lazy load</h2>
    <ul class="container">
      <li v-for="(item, index) in images" :key="index" class="item">
        <img v-lazy="item.image">
      </li>
    </ul>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      message: '',
      images: []
    }
  },
  mounted () {
    this.getImageData()
  },
  methods: {
    getImageData () {
      const url = 'https://fullstar.zhhainiao.com/inst/promotion_mobile/kwp/get'
      Axios.post(url, { pid: 12, cn: 910012, kid: 17063 }).then(res => {
        console.log(res)
        this.images = res.data.screen2_wallpapers
      }).catch(error => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
html,body{
  background: #ffeead;
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.lazyLoad {
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit,minMax(200px,1fr));
    // grid-auto-rows: 300px;
    gap: 20px;
    .item {
      display:flex;
      align-items: center;
      justify-content: center;
      border-radius:10px;
      img {
        width: 100%;
        // height: 100%;
        border-radius: 10px;
      }
    }
  }
}

</style>
