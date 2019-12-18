import Vue from "vue";
import Vuex from "vuex";

import user from "./module/user";
import app from "./module/app";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    app
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ] // 默认将vuex数据保存到localStorage防止刷新丢失，修改为sessionStorage，页面关闭后清空
});
