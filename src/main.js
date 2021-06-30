import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
 
Vue.use(Vuetify)

import MtaScheduler from './components/MtaScheduler.vue'

const Components = {
  MtaScheduler
}
 
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})
 
export default Components