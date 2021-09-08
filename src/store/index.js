import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: `${window.location.protocol}//${window.location.hostname}:3000/api`,
  },
  mutations: {},
  actions: {},
  modules: {},
});
