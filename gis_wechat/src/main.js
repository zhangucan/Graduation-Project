import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'http://127.0.0.1:3001')
const Bus = new Vue()
Vue.use(contentmenu)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  data: {
    Bus
  },
  router,
  store,
  template: '<App/>',
  components: { App }
})
