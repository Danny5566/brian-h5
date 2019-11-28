<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  -webkit-tap-highlight-color: transparent;
}
.main {
  height: 100vh;
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
    .card {
      border-bottom: 6px solid #f6f8fb;
      padding: 6px 16px;
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
</style>
