import axios from "axios";
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
        config.headers.source = "H5";
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
