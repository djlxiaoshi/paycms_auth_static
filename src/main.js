// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './common/css/base.css'
import 'common/css/table.min.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.http.options.root = 'http://paycms-open.oa.com/api'
Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
