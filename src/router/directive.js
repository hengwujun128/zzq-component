
const directiveRoute = [
  {
    path: '/directive/lazyload',
    name: 'LazyLoad',
    component: ()=> import(/* webpackChunkName: GridBasic */ '../views/Directive/LazyLoad.vue')
  },
]

export default directiveRoute