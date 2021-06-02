const observers = [
  {
    path: '/observer/intersection',
    name: 'ObserverIntersection',
    component: () => {
      return import(/* webpackChunkName: 'ScrollHeader' */ '@/views/Observer/Intersection.vue')
    }
  },
  {
    path: '/observer/scrollLoadMore',
    name: 'ScrollLoadMore',
    component: () => {
      return import(/* webpackChunkName: 'ScrollHeader' */ '@/views/Observer/ScrollLoadMore.vue')
    }
  }
]

export default observers
