<template>
  <div class="guide">
    <img :src="require('@/assets/images/open-wx.png')" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.guide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  img {
    width: 70%;
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
