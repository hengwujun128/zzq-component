
const gridRoutes = [
  {
    path: '/grid/basic',
    name: 'GridBasic',
    component: ()=> import(/* webpackChunkName: GridBasic */ '../views/Grid/Basic.vue')
  },
  {
    path: '/grid/firstGrid',
    name: 'firstGrid',
    component: ()=> import(/* webpackChunkName: GridBasic */ '../views/Grid/FirstGrid.vue')
  }, 
  {
    path: '/grid/secondGrid',
    name: 'SecondGrid',
    component: ()=> import(/* webpackChunkName: GridBasic */ '../views/Grid/SecondGrid.vue')
  }
]

export default gridRoutes