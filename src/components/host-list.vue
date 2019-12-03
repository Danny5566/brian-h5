<template>
  <div class="user-list wrap-item">
    <div v-if="data.uid" class="item">
      <div v-if="!data.displayPhoto" class="avatar" :style="avatarSelect"></div>
      <div
        v-if="data.displayPhoto"
        class="avatar"
        :style="{
          backgroundImage: `url(http://oss.imbcloud.cn/image/${data.displayPhoto})`
        }"
      ></div>
      <div class="name">{{ data.name }}</div>
      <div class="delete" @click="deleteItem(data.uid)">
        <span class="iconfont icon-jian"></span>
      </div>
    </div>
    <div v-if="!data.uid" class="item" @click="addUser('host')">
      <div class="avatar add-icon">
        <span class="iconfont icon-add"></span>
      </div>
      <div class="add-name name">添加主持人</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hostList",
  props: ["data"],
  data() {
    return {
      avatarSelect: {
        backgroundImage:
          "url(" + require("@/assets/images/avatar-select.png") + ")"
      }
    };
  },
  methods: {
    deleteItem(id) {
      this.$emit("sendRemoveHost", id);
    },
    addUser(type) {
      this.$router.replace({
        name: "users",
        params: {
          type: type
        }
      });
    }
  },
  mounted() {}
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
    .delete {
      position: absolute;
      top: -6px;
      left: -6px;
      color: #d63f3f;
      padding: 6px;
      .iconfont {
        background: #ffffff;
        border-radius: 100%;
      }
    }
  }
  .avatar {
    width: 52px;
    height: 52px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 100%;
  }
}
.wrap-item {
  flex-wrap: wrap;
  .item {
    margin-bottom: 6px;
    .add-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #d0d0d0;
      .icon-add {
        padding: 10px 12px;
        border: 1px dashed #d0d0d0;
        border-radius: 100%;
        font-size: 28px;
        color: #d0d0d0;
      }
    }
    .add-name {
      color: #d0d0d0;
    }
  }
}
</style>
