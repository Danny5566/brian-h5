<template>
  <div class="main">
    <lcTitle :userLength="data.length"></lcTitle>
    <div class="contain" ref="wrapper">
      <ul>
        <li class="item" v-for="item in data" :key="item.uid">
          <div class="box">
            <div
              v-if="!item.displayPhoto"
              class="avatar"
              :style="avatarSelect"
            ></div>
            <div
              v-else
              class="avatar"
              :style="{
                backgroundImage: `url(http://oss.imbcloud.cn/image/${item.displayPhoto})`
              }"
            ></div>
            <div class="right-list">
              <div class="name">{{ item.name }}</div>
              <div class="org">{{ item.organizationName }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import lcTitle from "_/title.vue";

export default {
  components: { lcTitle },
  data() {
    return {
      data: [],
      avatarSelect: {
        backgroundImage:
          "url(" + require("@/assets/images/avatar-select.png") + ")"
      }
    };
  },
  mounted() {
    this.data = this.$route.params.users;
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true,
        mouseWheel: true
      });
    });
  }
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul {
  padding: 0 20px;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 0;
  border-bottom: 1px solid #f9f7f7;
  position: relative;

  &:nth-child(1)::after {
    content: "(主持人)";
    position: absolute;
    right: 0;
    top: 16px;
    color: #333333;
    font-size: 14px;
  }
  .box {
    display: flex;
    .avatar {
      width: 38px;
      height: 38px;
      background: #67aee8;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 10px;
      border-radius: 100%;
    }
    .right-list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        font-size: 16px;
        color: #333333;
        line-height: 22px;
      }
      .org {
        font-size: 12px;
        color: #666666;
        line-height: 17px;
      }
    }
  }
}
</style>
