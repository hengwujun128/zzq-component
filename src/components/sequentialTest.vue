<template>
  <div class="slide-container">
    <h2>hello,slide</h2>
    <div class="content" v-for="(item, index) in items" :key="index">
      <div class="title" @click="toogle(index)">
        {{item.name}}
        <!-- 1. 使用v-show -->
        <!-- <i class="triangle" v-show="toogleHeight===index"></i> -->
        <!-- 2.使用 opacity -->
        <i :class="{triangle:true,isShowTriangle:toogleHeight===index}"></i>
      </div>
      <div class="body" :style="{minHeight:(toogleHeight===index)?'50px':0}">
        <div class="desc">{{item.content}}</div>
      </div>
    </div>
    <div class="sequence">
      <sequential-entrance delay="250">
        <div class="box" v-for="index in 5" :key="index"></div>
      </sequential-entrance>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toogleHeight: null,
      items: [
        { name: 'hover slide1',content: 'aaaaa' },
        { name: 'hover slide2',content: 'bbbbb' },
        { name: 'hover slide3',content: 'ccccc' },
        { name: 'hover slide4',content: 'ddddd' },
        { name: 'hover slide5',content: 'eeeee' },
      ]
    }
  },
  methods: {
    toogle (index) {
      if(this.toogleHeight===index) {
        this.toogleHeight=null
      } else {
        this.toogleHeight=index
      }
    },
    isShowTriangle (index) {
      if(this.toogleHeight===index) {
        return {
          opactiy: 1,
          transform: 'scale(1)'
        }
      }
    }
    // isShow (index) {
    //   let isShow=false
    //   setTimeout(() => {
    //     return isShow=this.toogleHeight===index
    //   },1000)
    // }
  },
}
</script>

<style lang="scss" scoped>
$titleHeight: 40px;
.slide-container {
  .content {
    width: 300px;
    // background: #ddd;
    .title {
      height: $titleHeight;
      line-height: $titleHeight;
      font-size: 18px;
      padding: 0 10px;
      cursor: pointer;
      background-color: aqua;
      border-radius: 6px;
      border-bottom: 2px solid #dddddd;
      position: relative;
      .triangle {
        position: absolute;
        left: 20%;
        bottom: -16px;
        transform: rotate(45deg);
        display: block;
        width: 20px;
        height: 20px;
        opacity: 0;
        background: #dddddd;
        transition: all 0.3s;
      }
      .isShowTriangle {
        opacity: 1;
      }
    }
    .body {
      transition: all 0.6s ease;
      height: 0px;
      overflow: hidden;
      background: #dddddd;
      // padding: 10px;
    }
    &:hover {
      .body {
        // background-color: #eee;
        // height: calc(100% - $titleHeight);
        // height: 100px;
      }
    }
  }
  .sequence {
    span {
      display: flex;
      justify-content: center;
    }
    .box {
      border-radius: 10px;
      background-color: coral;
      width: 100px;
      height: 100px;
      margin: 1rem;
    }
  }
}
</style>