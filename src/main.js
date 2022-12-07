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
  post: "https://638f979d4bfe20f70ad5672b.mockapi.io/posts",
  users: "https://638f979d4bfe20f70ad5672b.mockapi.io/post-app-users"
}
new Vue({
  el: '#app',
  vuetify: new vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
