import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import bigscreen from './modules/bigscreen'
import map from './modules/map'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    bigscreen,
    map
  },
  getters
})

export default store
