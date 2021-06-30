import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import MtaScheduler from "./components/MtaScheduler.vue"; 

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(MtaScheduler),
}).$mount('#app')
