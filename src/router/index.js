/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

import HelloWorld from '@/views/Swiper/HelloWorld'


import Grid from './grid';
import Directive from './directive';
import Scroll from './scroll';
import Observers from './observer';
import Animation from './animation';

Vue.use(Router)

let app_router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // redirect: '/scroll/scrollHeader',
      redirect: '/observer/intersection',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    ...Grid,
    ...Directive,
    ...Scroll,
    ...Observers,
    ...Animation,
    {
      path: '/instruction',
      name: 'Instruction',
      component:()=> import(/* webpackChunkname:'instruction' */ '../views/Instruction.vue')
    },
  ]
})
NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  speed: 500,
  trickle: false,
  trickleSpeed: 200
}) // NProgress Configuration

app_router.beforeEach((to, from, next) => {
  NProgress.start()

  // setTimeout(() => {
  next()
  NProgress.done()
  // }, 2000);
})
app_router.afterEach(() => {
  NProgress.remove()
})
export default app_router
