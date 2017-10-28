import Vue from 'vue'

import App from './layout/App'
import router from './router'
import store from './store'

import * as filters from './filters'

import '@/assets/css/iconfont.css'
import 'highlight.js/styles/atom-one-dark.css'

import clickOutside from './utils/clickOutside.js'

import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper/ssr'

// import fs from 'fs'
// import path from 'path'

// fs.readFileSync(path.join(__static, '/font/Futura.ttc'))

Vue.use(VueAwesomeSwiper)

Vue.directive('click-outside', clickOutside)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

// 实例化过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
