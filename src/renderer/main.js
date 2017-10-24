import Vue from 'vue'
import axios from 'axios'

import element from 'element-ui'

import App from './App'
import router from './router'
import store from './store'

import '@/assets/theme/index.css'
import '@/assets/css/iconfont.css'

// import 'static/theme/index.css'

import * as filters from './filters'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(element)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  ...App
})

export default app
