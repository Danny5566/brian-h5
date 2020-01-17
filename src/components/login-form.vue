<template>
  <div>
    <div class="input-box">
      <span class="iconfont icon-lock icon"></span>
      <nut-textinput
        v-model="loginForm.userName"
        placeholder="请输入账号"
        :hasBorder="false"
      />
    </div>
    <div class="input-box">
      <span class="iconfont icon-user icon"></span>
      <nut-textinput
        v-model="loginForm.password"
        placeholder="请输入密码"
        :hasBorder="false"
        type="password"
      />
    </div>
    <nut-button
      @click="loginIn"
      @blur="true"
      type="primary"
      block
      shape="circle"
      >登录</nut-button
    >
  </div>
</template>

<script>
import { login } from "@/api/user";
import { getPocUserInfo } from "@/api/data";

export default {
  name: "loginForm",
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      btnState: true
    };
  },
  methods: {
    loginIn() {
      if (!this.loginForm.userName) {
        this.$toast.text("请输入账户");
        return false;
      }
      if (!this.loginForm.password) {
        this.$toast.text("请输入密码");
        return false;
      }
      login(this.loginForm).then(res => {
        if (res.data.code === 200) {
          // 登录成功
          this.$store.commit("setToken", res.data.data.token);
          this.$store.commit("setUserId", res.data.data.userName);
          this.getHost();
        } else {
          this.$toast.text(res.data.msg);
        }
      });
    },
    getHost() {
      getPocUserInfo()
        .then(res => {
          if (res.data.code === 200) {
            this.host = res.data.data;
            if (res.data.data.displayPhoto) {
              this.$store.commit(
                "setImg",
                "http://oss.imbcloud.cn/image/" + res.data.data.displayPhoto
              );
            }
            this.$store.commit("setUserName", res.data.data.name);
            this.$store.commit("setSelectHost", [res.data.data]);
          } else {
            this.$toast.text(res.data.msg);
          }
        })
        .then(() => {
          this.$router.replace({
            name: "record"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.input-box {
  position: relative;
  border-bottom: 1px solid #3a70f2;
  margin-bottom: 30px;
  padding-left: 30px;
  .icon {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 18px;
    color: #4e7ceb;
  }
}
.login-btn {
  margin-top: 20px;
}
</style>
