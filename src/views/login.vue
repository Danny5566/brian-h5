<template>
  <div class="login">
    <header></header>
    <div class="wrapper">
      <loginForm></loginForm>
    </div>
  </div>
</template>

<script>
import loginForm from "_/login-form";

export default {
  components: { loginForm }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  background-image: url("~@/assets/images/bg-decoration.png");
  background-size: 80px 126px;
  background-repeat: no-repeat;
  background-position: left 12px bottom 32px;
  header {
    height: 114px;
    background-image: url("~@/assets/images/login-top.png");
    background-size: 100%;
  }
  .wrapper {
    padding: 30px;
  }
}
</style>
