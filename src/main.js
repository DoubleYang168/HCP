import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { VueAxios } from './utils/request'
import './core/lazy_use'

Vue.config.productionTip = false

Vue.use(VueAxios)

router.beforeEach((to, from, next) => {
  document.title = "水文云"
  next()
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
