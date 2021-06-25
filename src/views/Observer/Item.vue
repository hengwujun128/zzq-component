<template>
  <div class="item">{{ index }} - {{ source.wname }}</div>
</template>

<script>
export default {
  name: 'item-component',
  props: {
    index: { // index of current item
      type: Number
    },
    source: { // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  height: 50px;
  line-height: 50px;
  margin: 10px auto;
  background: rgb(240, 142, 142)
}
</style>
