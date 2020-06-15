/*
 * @Author: your name
 * @Date: 2020-01-02 18:39:55
 * @LastEditTime: 2020-06-12 14:13:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import '@/assets/scss/reset.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 第三方库
import http from '@/api/config.js'
import './mock'
import { postRequest } from './api/test'

Vue.use(ElementUI)
Vue.config.productionTip = false
// 挂载到vue原型对象上,下次想要使用axios异步请求就可以 $http. 的方式调用
Vue.prototype.$http = http
Vue.prototype.$message = ElementUI.Message
Vue.prototype.postRequest = postRequest

router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit('getMenu')
  let token = store.state.user.token
  // 过滤登录页，防止死循环
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
