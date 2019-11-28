<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <div v-for="(item, index) in listData1" :key="index">{{ index }}</div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

export default {
  data() {
    return {
      listData1: new Array(20)
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true
      });
    });
  }
};
</script>

<style>
.wrapper {
  height: 100px;
  background: skyblue;
  /* overflow: hidden; */
}
</style>
