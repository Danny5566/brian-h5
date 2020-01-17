<template>
  <div id="app">
    <router-view />
    <guide v-if="open"></guide>
  </div>
</template>

<script>
import guide from "_/guide";

export default {
  components: { guide },
  data() {
    return {
      height: "",
      open: false,
      environment: {
        isAndroid: Boolean(navigator.userAgent.match(/android/gi)),
        isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)),
        isIpad: Boolean(navigator.userAgent.match(/ipad/gi)),
        isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi)),
        isAli: Boolean(navigator.userAgent.match(/AlipayClient/gi)),
        isPhone: Boolean(
          /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
        )
      }
    };
  },
  created() {
    if (this.environment.isAndroid && this.environment.isWeixin) {
      this.open = true;
    }
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
#app {
  -webkit-tap-highlight-color: transparent;
  background: #ffffff;
}
.main {
  height: 100%;
  min-height: "-webkit-fill-available";
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #666666;
  .navbar {
    box-shadow: 0 2px 6px #f6f8fb;
    .nut-avatar {
      margin-right: 0;
    }
    .nav-center .nav-title {
      font-weight: 400;
      font-size: 18px;
      color: #333333;
    }
  }
  .contain {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 6px;
    overflow: hidden;
    background: #fff;
    .card {
      border-bottom: 6px solid #f6f8fb;
      padding: 6px 16px;
      background: #fff;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 62px;
    width: 100%;
    border-top: 1px solid #f1f3f5;
    background: #ffffff;
    .btn-box {
      margin: 0 20px;
      width: 100%;
    }
  }
}
/**
  修改 会议预约中 nut-input 字体颜色
*/
.reserve .nut-input input {
  color: #666666;
}
/**
  修改 dialog 按钮样式
*/
.dialog .nut-dialog-cancel {
  border-top: 1px solid #f1f3f5;
}
.dialog .nut-dialog-ok {
  background: #fff;
  color: #d0021b;
  border-top: 1px solid #f1f3f5;
  border-left: 1px solid #f1f3f5;
}
.dialog .nut-dialog-btn:focus {
  outline: -webkit-focus-ring-color auto 5px !important;
}
// 导航标题聚焦样式, 蒙版聚焦样式
.nav-title:focus,
.nut-actionsheet-panel:focus {
  outline: none;
}
</style>
