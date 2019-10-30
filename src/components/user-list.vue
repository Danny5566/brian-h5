<template>
  <div class="user-list">
    <div class="item" v-for="item in showList" :key="item.uid">
      <div v-if="!item.displayPhoto" class="avatar" :style="avatarSelect"></div>
      <div v-else class="avatar">正常头像</div>
      <div class="name">{{ item.name }}</div>
    </div>
    <div v-if="showMore" class="showMore">
      <span class="iconfont icon-right"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "userList",
  props: ["data"],
  data() {
    return {
      showList: [],
      showMore: false,
      avatarSelect: {
        backgroundImage:
          "url(" + require("@/assets/images/avatar-select.png") + ")"
      }
    };
  },
  mounted() {
    // 通过页面宽度和item宽度计算显示用户数量
    this.showList = JSON.parse(JSON.stringify(this.data));
    let length = Math.floor((document.body.offsetWidth - 12) / 62);
    if (this.showList.length > length) {
      this.showMore = true;
      this.showList.length = length;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-list {
  display: flex;
  .item {
    position: relative;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
      padding-top: 6px;
    }
  }
  .item:nth-child(1)::before {
    content: "主持人";
    position: absolute;
    font-size: 10px;
    color: #666666;
    top: -18px;
  }
  .avatar {
    width: 52px;
    height: 52px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .showMore {
    display: flex;
    align-items: center;
  }
}
</style>
