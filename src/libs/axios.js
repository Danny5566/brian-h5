import axios from "axios";
import store from "@/store";
import router from "@/router";
// import { nextTick } from "q";
// import store from "@/store";

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    };
    return config;
  }
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 当前vuex 已存在token, 并且没有另外传头部token 的时候处理
        if (store.state.user.token && !config.headers.token) {
          config.headers.token = store.state.user.token;
        }
        config.headers.source = "H5";
        if (config.method === "post" && !config.upload) {
          // 处理post 数据类型转为 formdata
          const formData = new FormData();
          Object.keys(config.data).forEach(key =>
            formData.append(key, config.data[key])
          );
          config.data = formData;
        }
        this.queue[url] = true;
        return config;
      },
      err => {
        Promise.reject(err);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        // token 失效跳转 login
        if (res.data.code === -10086) {
          store.commit("setToken", "");
          router.replace({ name: "login" });
        }
        this.destroy(url);
        const { data, status } = res;
        return { data, status };
      },
      err => {
        this.destroy(url);
        return Promise.reject(err);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
