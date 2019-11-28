<template>
  <div class="refresh" :style="{ color: color || '#666' }">
    <span
      class="iconfont icon-loading"
      :style="{ fontSize: fontSize || '20px', color: color || '#666' }"
    ></span>
    {{ msg || "刷新中..." }}
  </div>
</template>

<script>
export default {
  props: ["fontSize", "color", "msg"]
};
</script>

<style scoped lang="scss">
.refresh {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  // position: relative;
  // top: 50%;
  // transform: translate(0, -50%);
  span {
    padding: 0 6px;
  }
}
.iconfont {
  display: inline-block;
  font-size: 30px;
  color: #000;
  -webkit-animation: load 1.5s infinite linear;
  animation: load 1.5s infinite linear;
}
@-webkit-keyframes load {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate((360deg));
  }
}
@keyframes load {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate((360deg));
  }
}
</style>
