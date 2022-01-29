import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import vuetify from 'vuetify'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
Vue.use(vuelidate)
Vue.use(vuetify)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$http = {
  post: "http://localhost:5000/posts",
  users: "http://localhost:5000/users"
}

// какие то изменения
//asdasdasdasd
new Vue({
  el: '#app',
  vuetify: new vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
