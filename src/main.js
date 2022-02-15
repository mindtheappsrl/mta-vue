import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import MtaScheduler from './components/MtaScheduler.vue'
import MtaHorizontalScrollbar from "./components/MtaHorizontalScrollbar";
import MtaSurveys from "./components/surveys/MtaSurveys";
import MtaAutocomplete from "./components/inputs/MtaAutocomplete";
import MtaAutocompleteMultiple from "./components/inputs/MtaAutocompleteMultiple";
import MtaConfirmDialog from "./components/dialogs/MtaConfirmDialog";
import MtaDeleteDialog from "./components/dialogs/MtaDeleteDialog";
import MtaDialogWithHeader from "./components/dialogs/MtaDialogWithHeader";
import MtaSimpleDialog from "./components/dialogs/MtaSimpleDialog";

Vue.use(Vuetify)

const Components = {
  MtaScheduler,
  MtaHorizontalScrollbar,
  MtaSurveys,
  MtaAutocomplete,
  MtaAutocompleteMultiple,
  MtaConfirmDialog,
  MtaDeleteDialog,
  MtaDialogWithHeader,
  MtaSimpleDialog
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
