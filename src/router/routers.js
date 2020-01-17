/**
 * meta 中属性，控制navbar显示内容
 * avatar 是否显示头像
 * back 是否显示返回, 默认返回是返回上一个路由, 强制修改路由返回路径需要去title组件修改
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
    path: "/detail/:id",
    name: "detail",
    meta: {
      title: "预约详情",
      back: true,
      share: false
    },
    component: () => import("@/views/detail.vue")
  },
  {
    path: "/users",
    name: "users",
    meta: {
      title: "选择参会人员",
      back: true
    },
    component: () => import("@/views/users.vue")
  },
  {
    path: "/reserve",
    name: "reserve",
    meta: {
      title: "会议预约",
      back: true
    },
    component: () => import("@/views/reserve.vue")
  },
  {
    path: "/share/:id",
    name: "share",
    meta: {
      title: "会议分享"
    },
    component: () => import("@/views/share.vue")
  },
  {
    path: "/participant",
    name: "participant",
    meta: {
      title: "参会人员",
      back: true
    },
    component: () => import("@/views/participant.vue")
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
  },
  {
    path: "/test",
    name: "test",
    meta: {
      title: "测试"
    },
    component: () => import("@/views/test.vue")
  }
];
