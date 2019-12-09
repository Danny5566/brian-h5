export default {
  state: {
    curName: "",
    lastRoute: "",
    curRoute: "",
    title: "",
    avatar: false,
    share: false,
    back: false,
    meetingId: "", // 用来存放当前会议信息详情的会议id，防止跳转后刷新页面空白
    selectHost: [],
    selectUser: [],
    formData: {
      startTime: "",
      endTime: "",
      meetingSubject: "",
      meetingType: 0,
      hostId: "",
      hostTel: "",
      tel: "",
      participantsTels: [],
      remark: ""
    },
    curTel: ""
  },
  mutations: {
    setCurName(state, curName) {
      state.curName = curName;
    },
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
    },
    setMeetingId(state, meetingId) {
      state.meetingId = meetingId;
    },
    setSelectHost(state, host) {
      state.selectHost = host;
    },
    setSelectUser(state, user) {
      state.selectUser = user;
    },
    setFormData(state, formData) {
      state.formData = formData;
    },
    setCurTel(state, curTel) {
      state.curTel = curTel;
    }
  },
  actions: {}
};
