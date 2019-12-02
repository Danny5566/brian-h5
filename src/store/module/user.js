import { getToken, setToken } from "@/libs/util";

export default {
  state: {
    userName: "",
    userId: "",
    avatarImgPath: "",
    token: getToken(),
    access: ""
  },
  mutations: {
    setImg(state, avatarPath) {
      state.avatarImgPath = avatarPath;
    },
    setUserId(state, id) {
      state.userId = id;
    },
    setUserName(state, name) {
      state.userName = name;
    },
    setAccess(state, access) {
      state.access = access;
    },
    setSource(state, source) {
      state.source = source;
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    }
  },
  actions: {}
};
