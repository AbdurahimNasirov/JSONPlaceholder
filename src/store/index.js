import Vue from 'vue'
import Vuex from 'vuex'
import posts from './posts/index'
import users from './users/index'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async fetchBasic(ctx, { url, data = null, method }) {
      try {
        const req = await axios(
          {method:method, url: url, data:data})
        return req.data ? req.data : false
      } catch (e) {
        const error = new Error('Не удалось получить пользователей')
        throw error
      }
      // только папку service
    }
  },
  modules: {
    posts,
    users
  }
})
