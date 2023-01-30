import {
  createStore
} from 'vuex'
import tab from './tab.js'
export default createStore({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    namespaced: true,
    tab
  }
})