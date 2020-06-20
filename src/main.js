import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import './network' //引入网络请求模块
import  'normalize.css' //引入标准重置样式
import './assets/css/base.css' //引入全局样式
import toast from './components/common/toast/index'
Vue.use(toast)  //引入全局的提示框插件


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
