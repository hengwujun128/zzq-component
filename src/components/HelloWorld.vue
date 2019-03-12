<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ZBanner>This is a banner!</ZBanner>
    <ZButton @click="test">this is a my Button</ZButton>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    test () {
      alert(123)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
