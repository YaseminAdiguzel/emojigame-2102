import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import {routes} from './routes.js'
import Vuetify from 'vuetify/lib'
import Alertify from 'alertifyjs';
import VueAxios from 'vue-axios'
import axios from 'axios'
Vue.use(VueAxios, axios)

import Toasted from 'vue-toasted'
Vue.use(Toasted, {
  duration: 3000,
  position: 'top-center',
  action : {
    onClick : (e, toastObject) => {
        toastObject.goAway(0);
    }
  }
})


Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.prototype.$alertify = Alertify;



const router = new VueRouter({
  routes,
  mode : 'history'
})

new Vue({
  vuetify,
  router,
  
  
  render: h => h(App)
}).$mount('#app')
