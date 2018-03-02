// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store/'
import Loading from './components/Loading'
import VueLazyLoad from 'vue-lazyload'

Vue.use(Loading);
//图片懒加载
Vue.use(VueLazyLoad,{
  loading:"/static/img/loading.gif"
});
axios.interceptors.request.use(function (config) {
  store.dispatch('showLoading');
  return config;
},function (error) {
  return Promise.reject(error);
});
axios.interceptors.response.use(function(response){
  store.dispatch('hideLoading');
  return response
},function(error){
  return Promise.reject(error);
});

Vue.prototype.$http = axios;

require('./assets/css/main.css')
require('./assets/css/base.css')
require('./assets/css/product.css')
require('./assets/css/login.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
