import Vue from 'vue'
import Vuex from 'vuex'
import permission from "./modules/permission"
import getters from "./getters";
import user from "./modules/user";
import app from "./modules/app";
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
})

export default store
