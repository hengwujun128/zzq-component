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
  },
  {
    path: '/observer/virtualScroll',
    name: 'VirtualScroll',
    component: () => {
      return import(/* webpackChunkName: 'VirtualScroll' */ '@/views/Observer/VirtualScroll.vue')
    }
  }
]

export default observers
