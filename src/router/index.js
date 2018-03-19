import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Cart from '@/components/views/Cart'
import Loading from '@/components/Loading'
import GoodsList from '@/components/Goods/GoodsList'
import Address from '@/components/Address/Address'
import OrderComfirm from '@/components/Order/OrderComfirm'
import OrderSuccess from '@/components/Order/OrderSuccess'
import Contact from '@/components/Contact/Contact'
import AddGood from '@/components/addGood'
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
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    },
    {
      path:'/allGoods',
      name:'GoodsList',
      component:GoodsList
    },
    {
      path:'/address',
      name:'Address',
      component:Address
    },
    {
      path:"/orderComfirm",
      name:'OrderComfirm',
      component:OrderComfirm
    },
    {
      path:"/orderSuccess",
      name:'OrderSuccess',
      component:OrderSuccess
    },
    {
      path:"/addGood",
      name:'addGood',
      component:AddGood
    },
    {
      path:'/contact',
      name:'contact',
      component:Contact
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
