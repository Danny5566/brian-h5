/**
 * meta 中属性，控制navbar显示内容
 * avatar 是否显示头像
 * back 是否显示返回
 * share 是否显示分享
 */
export default [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/record",
    name: "record",
    meta: {
      title: "会议记录",
      avatar: true
    },
    component: () => import("@/views/record.vue")
  },
  {
    path: "/detail",
    name: "detail",
    meta: {
      title: "会议详情",
      back: true,
      share: true
    },
    component: () => import("@/views/detail.vue")
  },
  {
    path: "/about",
    name: "about",
    meta: {
      title: "我的信息",
      back: true
    },
    component: () => import("@/views/about.vue")
  },
  {
    path: "/error",
    name: "error",
    meta: {
      title: "错误"
    },
    component: () => import("@/views/error.vue")
  }
];
