const animation = [
  {
    path: '/animation/flyBall',
    name: 'flyBall',
    component: () => {
      return import(/* webpackChunkName: 'flyBall' */ '@/views/Animation/FlyBall.vue')
    }
  },
]

export default animation
