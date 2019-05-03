<template>
  <div>
    <h2>hello,this is tooltip component</h2>
    <!-- <div class="tooltip">Hover over me
      <span class="tooltiptext">Tooltip text</span>
    </div> -->
    <tooltip position="left">
      <div>
        <div class="title">hello,title</div>
        <div class="desc">hello,desc</div>
      </div>
    </tooltip>
  </div>
</template>

<script>
import tooltip from '../../../components/tooltip';
export default {
  data () {
    return {

    }
  },
  components: {
    tooltip
  }
}
</script>

<style lang="scss" scoped>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  cursor: pointer;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  // top
  // bottom: 125%;
  // left: 50%;
  // margin-left: -60px;

  /* left */
  right: 110%;
  top: 50%;
  transform: translateY(-50%);

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 1s;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    border-width: 5px;
    transform: translateY(-50%);
    border-style: solid;
    border-color: transparent transparent transparent #555;
  }
}

/* Tooltip arrow */
// .tooltip .tooltiptext::after {
//   content: '';
//   position: absolute;
//   top: 100%;
//   left: 50%;
//   margin-left: -5px;
//   border-width: 5px;
//   border-style: solid;
//   border-color: #555 transparent transparent transparent;
// }
/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>