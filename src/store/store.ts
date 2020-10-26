import Vue from 'vue'
import Vuex from 'vuex'
import { options, S } from './options'


Vue.use(Vuex)

export default new Vuex.Store<S>(options)
