<template>
  <div class="main">
    <lcTitle></lcTitle>
    <div class="contain">
      <div class="card user-card">
        <div
          v-if="!data.displayPhoto"
          class="avatar"
          :style="avatarSelect"
        ></div>
        <div v-else class="avatar">正常头像</div>
        <div class="name">{{ data.name }}</div>
        <div class="account">
          <span class="iconfont icon-user"></span>
          账号：{{ data.id }}
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn-box">
        <nut-button
          type="gray"
          color="#FFFFFF"
          :block="true"
          shape="circle"
          @click="loginOut"
          >退出登录</nut-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import lcTitle from "_/title.vue";
import store from "@/store";
import router from "@/router";

export default {
  components: { lcTitle },
  data() {
    return {
      data: {
        displayPhoto: "",
        name: "德玛西亚",
        id: "121312"
      },
      avatarSelect: {
        backgroundImage:
          "url(" + require("@/assets/images/avatar-select.png") + ")"
      }
    };
  },
  methods: {
    loginOut() {
      this.$dialog({
        title: "确定退出登录？",
        onOkBtn() {
          // 退出登录，清空token，跳转登录页
          store.commit("setToken", "");
          this.close(); //关闭对话框
          router.push({ name: "login" });
          this.$toast.text("当前账号已退出", {
            center: false
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .avatar {
    width: 72px;
    height: 72px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 40px;
  }
  .name {
    font-size: 18px;
    font-weight: 500;
    color: #333333;
    line-height: 25px;
    letter-spacing: 1px;
    margin-top: 12px;
  }
  .account {
    margin-top: 40px;
    color: #666666;
    font-size: 14px;
  }
}
</style>
