
const scroll = [
  {
    path: '/scroll/firstVirtualScroll',
    name: 'FirstVirtualScroll',
    component: () => import(/* webpackChunkName: 'LoadMore' */ '../views/Scroll/FirstVirtualScroll.vue')
  },
  {
    path: '/scroll/scrollHeader',
    name: 'ScrollHeader',
    component: () => import(/* webpackChunkName: 'ScrollHeader' */ '../views/Scroll/ScrollHeader.vue')
  }
]

export default scroll
