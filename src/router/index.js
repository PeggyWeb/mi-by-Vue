import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Cart from '@/components/Cart'

Vue.use(Router)

export default new Router({
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
