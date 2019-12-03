<template>
  <div class="main">
    <lcTitle></lcTitle>
    <div class="contain">
      <div class="card">
        <div class="search-bar">
          <span class="iconfont icon-search"></span>
          <input v-model="searchName" type="search" placeholder="搜索" />
        </div>
      </div>
      <div class="card bread-card" v-show="breadList.length">
        <bread @searchOid="getOidSearch" :data="breadList"></bread>
      </div>
      <div slot="list" class="card clearborder tree-list" v-show="isOrg">
        <h5 class="org-title" v-show="!breadList.length">组织机构</h5>
        <treeList
          @searchOid="getOidSearch"
          @setUser="getUser"
          @refreshSelect="findUserNum"
          type="edit"
          :userType="type"
          :orgData="curOrg"
          :userData="curUser"
          :selectData="tempUser"
          :userNum="userNum"
        ></treeList>
      </div>
      <div v-show="!isOrg && !users.length" class="miss">
        找不到关于
        <span>“{{ searchName }}”</span>
        的联系人
      </div>
      <div slot="list" class="card clearborder" v-show="!isOrg">
        <treeList
          @searchOid="getOidSearch"
          @setUser="getUser"
          type="view"
          :userType="type"
          :orgData="[]"
          :userData="users"
          :selectData="tempUser"
        ></treeList>
      </div>
    </div>
    <div v-show="isOrg" class="footer">
      <div class="footer-box">
        <div>已选择: {{ tempUser.length }}人</div>
        <button
          :class="{ 'select-btn': true, active: tempUser.length }"
          @click="submit"
        >
          确认
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import lcTitle from "_/title.vue";
import treeList from "_/tree-list.vue";
import bread from "_/bread.vue";

import { getOrg, getUsers } from "@/api/data";

export default {
  components: { lcTitle, treeList, bread },
  data() {
    return {
      type: "",
      orgList: [], // 获取所有
      userList: [],
      selectUser: [], // 已选择的user
      tempUser: [], // 暂时存放选中都人员，确定后更新至selectuser
      curOrg: [], // 当前显示，包括用户
      curUser: [],
      users: [], // 姓名搜索时候
      breadList: [], // 面包屑导航列表
      search: {
        oid: "",
        userName: "",
        page: 1
      },
      timeout: null,
      isOrg: true,
      searchName: "",
      pageSize: 20,
      select: 0,
      userNum: {}
    };
  },
  created() {
    // 判断添加主持人还是参会人员
    this.type = this.$route.params.type;
    if (this.type === "host") {
      this.selectUser = this.$store.state.app.selectHost;
    } else if (this.type === "user") {
      this.selectUser = this.$store.state.app.selectUser;
    }
    this.tempUser = JSON.parse(JSON.stringify(this.selectUser));
  },
  watch: {
    searchName: {
      handler(curVal) {
        clearTimeout(this.timeout);
        // 设置延时300ms查询
        this.timeout = setTimeout(() => {
          // 判断是否为空
          if (curVal) {
            this.isOrg = false;
            this.search = {
              page: 1,
              userName: curVal,
              oid: ""
            };
            this.users = [];
            this.searchUser();
          } else {
            this.isOrg = true;
            this.users = [];
          }
          // curVal ? (this.isOrg = false) : (this.isOrg = true);
        }, 300);
      },
      deep: true
    }
  },
  methods: {
    // 获取默认组织机构（全部）
    getOrgList() {
      getOrg(this.search).then(res => {
        if (res.data.code === 200) {
          this.orgList = this.orgList.concat(res.data.data);
          if (res.data.data.length === this.pageSize) {
            this.search.page++;
            this.getOrgList();
          } else {
            this.search.page = 1;
            this.getOrgUser();
          }
          res.data.data.forEach(item => {
            if (item.parentOid === 0) {
              this.curOrg.push(item);
              let obj = {
                page: 1,
                oid: item.oid,
                select: 0
              };
              this.findUserNum(obj);
            }
          });
        } else {
          this.orgList = [];
        }
      });
    },
    // 获取默认人员（全部）
    getOrgUser() {
      getUsers(this.search).then(res => {
        if (res.data.code === 200) {
          // 暂时获取数据
          if (res.data.data) {
            this.userList = this.userList.concat(res.data.data);
            if (res.data.data && res.data.data.length === this.pageSize) {
              // this.userList = this.userList.concat(res.data.data);
              this.search.page++;
              this.getOrgUser();
            }
          } else {
            this.userList = [];
          }
        } else {
          this.userList = [];
        }
      });
    },
    // 搜索时查询用户
    searchUser() {
      getUsers(this.search).then(res => {
        if (res.data.code === 200) {
          if (res.data.data) {
            this.users = this.users.concat(res.data.data);
          } else if (res.data.data && res.data.data.length === 20) {
            this.users = this.users.concat(res.data.data);
            this.search.page++;
            this.searchUser();
          } else {
            this.users = [];
          }
        } else {
          this.users = [];
        }
      });
    },
    // 组织机构点击查询处理
    getOidSearch(val) {
      this.search.oid = val.oid;
      this.curOrg = [];
      this.curUser = [];
      this.userNum = {};
      // console.log(val.type);
      this.orgList.forEach(item => {
        if (item.parentOid === val.oid) {
          // 计算全部和选中的人 oid, page, select
          let obj = {
            page: 1,
            oid: item.oid,
            select: 0
          };
          this.findUserNum(obj);
          this.curOrg.push(item);
        }
        if (item.oid === val.oid && val.type === "join") {
          this.breadList.push(item);
        }
      });
      if (val.oid === 0) {
        this.breadList = [];
      }
      this.breadList.forEach((item, index) => {
        if (item.oid === val.oid && val.type === "back") {
          this.breadList = this.breadList.slice(0, index + 1);
          // console.log(this.breadList);
        }
      });
      // 过滤用户信息
      this.userList.forEach(item => {
        if (item.oid === val.oid) {
          this.curUser.push(item);
        }
      });
    },
    // 计算该部门下全部和选中的人
    findUserNum(obj) {
      // oid, page, select
      let search = {
        page: obj.page,
        oid: obj.oid,
        userName: ""
      };
      let num = obj.select;
      getUsers(search).then(res => {
        if (res.data.code === 200) {
          if (res.data.data) {
            if (res.data.data.length === this.pageSize) {
              search.page++;
              res.data.data.forEach(item => {
                this.tempUser.forEach(element => {
                  if (item.uid === element.uid) {
                    num++;
                  }
                });
              });
              let obj = {
                page: search.page,
                oid: search.oid,
                select: num
              };
              this.findUserNum(obj);
            } else {
              res.data.data.forEach(item => {
                this.tempUser.forEach(element => {
                  if (item.uid === element.uid) {
                    num++;
                  }
                });
              });
              let temp = {
                select: num,
                all: res.data.data.length + (search.page - 1) * 20
              };
              this.$set(this.userNum, obj.oid, temp);
            }
          } else {
            let temp = {
              select: 0,
              all: 0
            };
            this.$set(this.userNum, obj.oid, temp);
          }
        } else {
          let temp = {
            select: 0,
            all: 0
          };
          this.$set(this.userNum, obj.oid, temp);
        }
      });
    },
    // 人员点击处理
    getUser(obj) {
      let hasUid = false;
      this.tempUser.forEach((item, index) => {
        if (item.uid === obj.uid) {
          this.tempUser.splice(index, 1);
          hasUid = true;
        }
      });
      if (!hasUid) {
        // 判断是否选择主持人，主持人只能选择一个
        if (this.type === "host" && this.tempUser.length > 0) {
          this.$toast.text("主持人仅能选择一个！");
        } else {
          this.tempUser.push(obj);
        }
      }
    },
    // 确认按钮提交
    submit() {
      // 根据类型插入host 或者 user
      if (this.tempUser.length === 0) {
        // 没有选择人员时不做处理
        return false;
      }
      // 放入store中
      if (this.type === "host") {
        this.$store.commit("setSelectHost", this.tempUser);
        this.$router.replace("reserve");
      } else if (this.type === "user") {
        this.$store.commit("setSelectUser", this.tempUser);
        this.$router.replace("reserve");
      }
    }
  },
  mounted() {
    this.getOrgList();
  }
};
</script>

<style lang="scss" scoped>
.main .contain .card.bread-card {
  padding-left: 0;
  padding-right: 0;
}
.search-bar {
  background: #edeff2;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 6px;
  border-radius: 8px;
  span {
    font-size: 18px;
    color: #999999;
  }
  input {
    background: #edeff2;
    outline: none;
    border: none;
    flex: 1;
    padding: 0 8px;
    color: #999;
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #c3c3c3;
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #c3c3c3;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #c3c3c3;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #c3c3c3;
    }
  }
}
.org-title {
  margin: 0;
  margin-bottom: 6px;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
}
.main .contain .card.clearborder {
  border: none;
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
}
.org-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  .org-list {
    flex: 1;
  }
}
.footer {
  height: 52px;
  .footer-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
  }
  .select-btn {
    border: none;
    background: #9ea3b3;
    border-radius: 4px;
    color: #ffffff;
    padding: 8px 24px;
    outline: none;
  }
  .select-btn.active {
    background: #4e7ceb;
  }
}
.miss {
  color: #999;
  text-align: center;
  padding: 20px 0;
  span {
    color: #333;
  }
}
</style>
