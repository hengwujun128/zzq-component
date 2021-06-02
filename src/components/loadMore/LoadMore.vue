<template lang="html">
  <div class="loader" v-show="!loaderDisable">
    <slot>
      <svg viewBox="25 25 50 50" class="loader__svg" :style="size">
        <circle cx="50" cy="50" r="20" class="loader__circle" :style="color"></circle>
      </svg>
    </slot>
  </div>
</template>

<script>

import 'intersection-observer'
export default {
  name: 'LoadMore',
  props: {
    /* Scrolling to the bottom to execute the method. */
    loaderMethod: {
      type: Function,
      required: true
    },
    /* scroll-loader will be disabled if the value of this props is true. */
    loaderDisable: {
      type: Boolean,
      required: false
    },
    /* The minimum distance between the scroll-loader(scrollbar) and the bottom of the viewport before the loader-method method is executed. */
    loaderDistance: {
      type: Number,
      default: 0
    },
    /* scroll-loader the color of the animation. */
    loaderColor: {
      type: String,
      default: '#cccccc'
    },
    /* scroll-loader the size of the animation. */
    loaderSize: {
      type: Number,
      default: 50
    },
    /* relative viewport element,default top-level document viewport. */
    loaderViewport: {
      type: Element,
      default: null
    }
  },
  computed: {
    size () {
      return {
        width: `${this.loaderSize}px`
      }
    },
    color () {
      return {
        stroke: this.loaderColor
      }
    },
    options () {
      return {
        root: this.loaderViewport,
        rootMargin: `0px 0px ${this.loaderDistance}px 0px`
      }
    },
    /* observer instance */
    observer () {
      return new IntersectionObserver(([{ isIntersecting }]) => {
        isIntersecting && !this.loaderDisable && this.loaderMethod()
      }, this.options)
    }
  },
  /* should observe current loadding logo when mounted */
  mounted () {
    this.observer.observe(this.$el)
  },
  /*  */
  activated () {
    this.observer.observe(this.$el)
  },
  deactivated () {
    this.observer.unobserve(this.$el)
  },
  beforeDestroy () {
    this.observer.unobserve(this.$el)
  }
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  &__svg {
    transform-origin: center;
    animation: rotate 2s linear infinite;
  }
  &__circle {
    fill: none;
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
