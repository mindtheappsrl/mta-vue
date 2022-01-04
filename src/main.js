import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
 
Vue.use(Vuetify)

import MtaScheduler from './components/MtaScheduler.vue'
import MtaHorizontalScrollbar from "./components/MtaHorizontalScrollbar";

const Components = {
  MtaScheduler,
  MtaHorizontalScrollbar
}
 
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})
 
export default Components

// Create render function and mount only in development mode
if (process.env.NODE_ENV === 'development') {
  import("./App.vue").then((app) => {
    new Vue({
      render: h => h(app.default)
    }).$mount("#app");
  });
}
