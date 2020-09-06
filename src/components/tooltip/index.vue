<template>
  <div class="tooltip-container">
    <div class="tooltip">
      HoverMe
      <span :class="[common, pos]">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      common: 'common'
    }
  },
  computed: {
    pos() {
      return `position-${this.position}`
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-container {
  .tooltip {
    position: relative;
    display: inline-block;
    cursor: pointer;

    .common {
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
      /* Fade in tooltip */
      opacity: 0;
      transition: opacity 1s;
    }
    /* left */
    .position-left {
      right: 110%;
      top: 50%;
      transform: translateY(-50%);
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
    .position-top {
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 100%;
        border-width: 5px;
        transform: translateX(-50%);
        border-style: solid;
        border-color: #555 transparent transparent transparent;
      }
    }
    .position-right {
      left: 120%;
      top: 50%;
      transform: translateY(-50%);
      &::after {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent #555 transparent transparent;
      }
    }
    .position-bottom {
      top: 120%;
      left: 50%;
      transform: translateX(-50%);
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 100%;
        transform: translateX(-50%);
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #555 transparent;
      }
    }

    &:hover {
      .common {
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
