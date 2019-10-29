import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/h5",
    name: "home",
    component: () => import("@/views/home.vue")
  },
  {
    path: "/h5/login",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/h5/record",
    name: "record",
    component: () => import("@/views/record.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
