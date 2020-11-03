import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { VueEffector } from 'effector-vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
import './plugins/bootstrap-vue'
import { DEFAULT_LOCALE, messages } from './constants/i18n'

import App from './App.vue'
import router from './router'
import store from './store/store'
import '@/models/init'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VueEffector)
const i18n = new VueI18n({
  locale: DEFAULT_LOCALE,
  messages
})

Vue.use(BootstrapVueIcons)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
