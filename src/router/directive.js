
const directiveRoute = [
  {
    path: '/directive/lazyload',
    name: 'LazyLoad',
    component: () => {
      return import(/* webpackChunkName: 'LazyLoad' */ '../views/Directive/LazyLoad.vue')
    }
  }
]

export default directiveRoute
