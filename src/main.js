import Vue from 'vue'
import MtaScheduler from './components/MtaScheduler.vue'

const Components = {
  MtaScheduler
}
 
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})
 
export default Components