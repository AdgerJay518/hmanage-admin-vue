import Vue from 'vue'
import Vuex from 'vuex'
import menu from "./modules/menu";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:''
  },
  mutations: {
    SET_TOKEN:(state , token)=>{
      state.token=token
      localStorage.setItem("token",token)
    },
    resetState:(state)=>{
      state.token=''
}
  },
  actions: {
  },
  modules: {
    menu
  }
})
