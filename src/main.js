import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/js/global.js'   //引入全局过滤器以及第三方UI组件和插件

import toast from './components/common/toast/index'
Vue.use(toast) //引入全局提示框组件
import './network' //引入网络请求模块
import  'normalize.css' //引入标准重置样式
import './assets/css/base.css' //引入全局样式



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
