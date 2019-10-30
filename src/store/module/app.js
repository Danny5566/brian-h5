export default {
  state: {
    lastRoute: "",
    curRoute: "",
    title: "",
    avatar: false,
    share: false,
    back: false
  },
  mutations: {
    setLastRoute(state, route) {
      state.lastRoute = route;
    },
    setCurRoute(state, route) {
      state.curRoute = route;
    },
    setTitle(state, title) {
      state.title = title;
    },
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
    setShare(state, share) {
      state.share = share;
    },
    setBack(state, back) {
      state.back = back;
    }
  },
  actions: {}
};
