import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Cart from '@/components/Cart'
import Loading from '@/components/Loading'

Vue.use(Router);
Vue.use(Loading);



export default new Router({
  mode:'history',
  scrollBehavior:() => ({
    y:0
  }),
  routes: [
    {
      path:'/Home',
      name:'Home',
      component:Home
    },
    {
      path:'/Login',
      name:'Login',
      component:Login
    },
    {
      path:'/Cart',
      name:'Cart',
      component:Cart
    },
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path:'*',
      redirect:'/Home'
    }
  ]
})
