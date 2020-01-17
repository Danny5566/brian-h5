/* eslint-disable no-undef */
<template>
  <div>
    <nut-navbar
      :leftShow="data.back"
      :rightShow="data.avatar || data.share"
      style="height: 44px; line-height: 44px;"
      @on-click-back="back"
      @on-click-more="share"
      class="navbar"
    >
      {{ data.title }}
      <span v-if="userLength">({{ userLength }})</span>
      <a v-if="data.avatar" slot="more-icon">
        <nut-avatar
          @activeAvatar="showAbout"
          :bgIcon="bgIcon"
          :bgImage="
            this.$store.state.user.avatarImgPath
              ? this.$store.state.user.avatarImgPath
              : require('@/assets/images/avatar-select.png')
          "
        ></nut-avatar>
      </a>
      <a v-if="data.share" slot="more-icon">分享</a>
    </nut-navbar>
  </div>
</template>

<script>
/**
 * 电视聚焦状态navbar的title，直接去源码中移除了点击事件
 */
export default {
  name: "lc-title",
  props: ["userLength"],
  data() {
    return {
      data: {},
      bgIcon: ""
    };
  },
  created() {
    this.data.title = this.$store.state.app.title;
    this.data.avatar = this.$store.state.app.avatar;
    this.data.share = this.$store.state.app.share;
    this.data.back = this.$store.state.app.back;
    this.data.lastRoute = this.$store.state.app.lastRoute;
    this.data.curRoute = this.$store.state.app.curRoute;
    this.data.curName = this.$store.state.app.curName;
    // 当在会议中时，分享事件触发
    if ((window.android || window.iosBack) && this.data.curName === "detail") {
      this.data.share = true;
    }
  },
  methods: {
    showAbout() {
      this.$router.replace({
        name: "about"
      });
    },
    back() {
      // 安卓app内调用 app 返回方法
      if (window.android && this.data.curName === "detail") {
        window.android.back();
        return false;
      } else if (window.iosBack && this.data.curName === "detail") {
        window.iosBack();
        return false;
      }
      // 强制修改返回路径唯一
      if (this.data.curName === "reserve") {
        // 会议预约强制返回到会议记录
        this.$router.replace({ name: "record" });
      } else if (this.data.curName === "detail") {
        this.$router.replace({ name: "record" });
      } else {
        this.$router.replace(this.data.lastRoute);
      }
    },
    share() {
      this.$emit("sendShare", true);
    }
  }
};
</script>

<style></style>
