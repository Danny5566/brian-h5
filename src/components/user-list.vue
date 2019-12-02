<template>
  <div
    :class="{ 'user-list': true, 'wrap-item': type === 'edit' ? true : false }"
    ref="item"
    @click="more"
  >
    <div
      :class="{
        item: true,
        label: type !== 'edit' && index === 0 ? true : false
      }"
      v-for="(item, index) in showList"
      :key="item.uid"
      ref="smallitem"
    >
      <div v-if="!item.displayPhoto" class="avatar" :style="avatarSelect"></div>
      <div
        v-if="item.displayPhoto"
        class="avatar"
        :style="{
          backgroundImage: `url(http://oss.imbcloud.cn/image/${item.displayPhoto})`
        }"
      ></div>
      <div class="name">{{ item.name }}</div>
      <div v-if="type === 'edit'" class="delete" @click="deleteItem(item.uid)">
        <span class="iconfont icon-jian"></span>
      </div>
    </div>
    <div v-if="type === 'edit'" class="item" @click="addUser('user')">
      <div class="avatar add-icon">
        <span class="iconfont icon-add"></span>
      </div>
      <div class="add-name name">添加人员</div>
    </div>
    <div v-if="showMore" class="showMore">
      <span class="iconfont icon-right"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "userList",
  props: ["data", "type"],
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
  watch: {
    data: function() {
      this.dealData();
    }
  },
  methods: {
    dealData() {
      if (this.data.length > 0) {
        this.showList = JSON.parse(JSON.stringify(this.data));
        let length = Math.floor(this.$refs.item.clientWidth / 60);
        if (this.showList.length > length && this.type !== "edit") {
          this.showMore = true;
          this.showList.length = length;
        }
      } else {
        this.showList = this.data;
        this.showMore = false;
      }
    },
    deleteItem(id) {
      this.$emit("sendRemoveUser", id);
    },
    addUser(type) {
      this.$router.push({
        name: "users",
        params: {
          type: type
        }
      });
    },
    more() {
      if (this.showMore) {
        this.$router.push({
          name: "participant",
          params: {
            users: this.data
          }
        });
      }
    }
  },
  mounted() {
    // 通过页面宽度和item宽度计算显示用户数量, 编辑状态显示全部数据
    this.dealData();
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
  .label::before {
    content: "主持人";
    position: absolute;
    font-size: 10px;
    color: #666666;
    top: -18px;
  }
  .avatar {
    width: 52px;
    height: 52px;
    // background: #67aee8;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: 100%;
    // &:last-child {
    //   background-color: #ffffff;
    // }
  }
  .showMore {
    display: flex;
    align-items: center;
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
