import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import routes from "./routers";
import { getToken } from "@/libs/util";

Vue.use(VueRouter);

const LOGIN_NAME = "login";

// 获取url中token参数值,适用于 hash 模式
const getHashParameters = () => {
  let arr = (location.hash || "").split("?")[1];
  if (!arr) {
    return "";
  } else {
    arr = arr.split("&");
  }
  let params = {};
  for (let i = 0; i < arr.length; i++) {
    let data = arr[i].split("=");
    if (data.length === 2) {
      params[data[0]] = data[1];
    }
  }
  return params;
};

const router = new VueRouter({
  // mode: "history",
  base: "/h5",
  routes
});

// const

// let toURL = null
router.beforeEach((to, from, next) => {
  const token = getToken();
  // vuex数据空，重新跳转到登录页
  if (!store.state.user.userId) {
    store.commit("setToken", "");
  }
  // share 页面不校验token
  if (to.name === "share" || to.name === "participant") {
    next();
    return;
  }
  // token 带参数的话获取

  if (!token && to.name !== LOGIN_NAME) {
    // detail 页面分享给没有token的人的时候处理为 share
    if (to.name === "detail") {
      let path = to.path.replace("detail", "share");
      next({ path: path });
      return false;
    }
    next({ name: LOGIN_NAME });
  } else if (!token && to.name === LOGIN_NAME) {
    let loginToken = getHashParameters("token");
    if (loginToken) {
      // app token 获取h5 token, 获取完成后跳转 record
      router.replace({ name: "record" });
      next();
    } else {
      next();
    }
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
  // console.log("to.name", to, "from.name", from);
  // 因为有的页面需要通过路由传参，所以使用path跳转
  store.commit("setLastRoute", from ? from.path : "");
  store.commit("setCurName", to.name);
  store.commit("setCurRoute", to.path);
  store.commit("setTitle", to.meta.title);
  store.commit("setAvatar", to.meta.avatar || false);
  store.commit("setShare", to.meta.share || false);
  store.commit("setBack", to.meta.back || false);
  window.scrollTo(0, 0);
});

export default router;
