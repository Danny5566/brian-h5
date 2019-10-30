import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import routes from "./routers";
import { getToken } from "@/libs/util";

Vue.use(VueRouter);

const LOGIN_NAME = "login";

const router = new VueRouter({
  mode: "history",
  base: "/h5",
  routes
});

router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token && to.name !== LOGIN_NAME) {
    next({ name: LOGIN_NAME });
  } else if (!token && to.name === LOGIN_NAME) {
    next();
  } else if (token && to.name === LOGIN_NAME) {
    next({ name: "record" });
  } else if (token && to.name !== LOGIN_NAME) {
    next();
  } else {
    next({ name: "error" });
  }
});

router.afterEach((to, from) => {
  // 标题基本信息
  // console.log("to.name", to.name, "from.name", from.name);
  store.commit("setLastRoute", from ? from.name : "");
  store.commit("setCurRoute", to.name);
  store.commit("setTitle", to.meta.title);
  store.commit("setAvatar", to.meta.avatar || false);
  store.commit("setShare", to.meta.share || false);
  store.commit("setBack", to.meta.back || false);
  window.scrollTo(0, 0);
});

export default router;
