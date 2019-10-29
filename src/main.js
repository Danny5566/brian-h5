import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Button,
  TextInput,
  Toast,
  NavBar,
  Avatar,
  Swiper,
  Scroller
} from "@nutui/nutui";
import "lib-flexible";
import "normalize.css";
import "@/assets/font/iconfont.css";

/**
 * nutui 按需引入
 */
Button.install(Vue);
TextInput.install(Vue);
Toast.install(Vue);
NavBar.install(Vue);
Avatar.install(Vue);
Swiper.install(Vue);
Scroller.install(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
