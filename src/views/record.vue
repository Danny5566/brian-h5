<template>
  <div class="main">
    <lcTitle></lcTitle>
    <div class="contain">
      <div class="tab">
        <div
          :class="{ active: activeItem === item.id }"
          v-for="item in tabData"
          :key="item.id"
          @click="changeTab(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <nut-swiper
        @slideChangeEnd="slideChangeEnd"
        class="swiper"
        direction="horizontal"
        :canDragging="false"
        ref="swiper"
      >
        <!-- 当前会议 -->
        <div class="nut-swiper-slide">
          <div ref="wrapper" class="wrapper">
            <div>
              <div v-if="!currentData.length" class="tips">
                —— 当前无数据 ——
              </div>
              <loading v-show="up"></loading>
              <div
                class="nut-vert-list-item"
                v-for="(item, index) of currentData"
                :key="index"
              >
                <card :data="item"></card>
              </div>
              <!-- <loading v-show="down" msg="加载更多"></loading> -->
              <div v-if="currentData.length && curEnd" class="tips">
                —— 我是有底线的 ——
              </div>
            </div>
          </div>
        </div>
        <!-- 历史会议 -->
        <div class="nut-swiper-slide">
          <div ref="wrapper2" class="wrapper">
            <div>
              <div v-if="!historyData.length" class="tips">
                —— 当前无数据 ——
              </div>
              <loading v-show="up"></loading>
              <div
                class="nut-vert-list-item"
                v-for="(item, index) of historyData"
                :key="index"
              >
                <card :data="item"></card>
              </div>
              <!-- <loading v-show="down" msg="加载更多"></loading> -->
              <div v-if="historyData.length && historyEnd" class="tips">
                —— 我是有底线的 ——
              </div>
            </div>
          </div>
        </div>
      </nut-swiper>
    </div>
    <div class="footer">
      <div class="btn-box">
        <nut-button type="primary" :block="true" shape="circle" @click="reserve"
          >会议预约</nut-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

import card from "_/card";
import lcTitle from "_/title.vue";
import loading from "_/loading.vue";

import { getH5MeetingPage, getPocUserInfo } from "@/api/data";

export default {
  components: { card, lcTitle, loading },
  data() {
    return {
      tabData: [
        {
          id: 1,
          name: "当前会议"
        },
        {
          id: 2,
          name: "历史会议"
        }
      ],
      activeItem: 1,
      curSearch: {
        page: 1,
        state: 1,
        sort: "am.create_time,asc"
      },
      curEnd: false,
      currentData: [],
      // 当前会议加载
      up: false,
      down: false,
      historySearch: {
        page: 1,
        sort: "am.create_time,desc"
      },
      historyEnd: false,
      historyData: [],
      pageSize: 20
    };
  },
  methods: {
    // 切换tab
    changeTab(id) {
      this.$refs.swiper.setPage(id);
      this.activeItem = id;
    },
    // 切换swiper后改变tab选中状态
    slideChangeEnd(pageSize) {
      this.activeItem = pageSize;
    },
    reserve() {
      this.$router.push({ name: "reserve" });
    },
    /**
     * 当前会议
     */
    getPage() {
      getH5MeetingPage(this.curSearch).then(res => {
        this.scroll.finishPullUp();
        if (res.data.code === 200) {
          // 分页数据为每次20条，小于20判断为没有数据
          if (res.data.data.length < this.pageSize) {
            this.curEnd = true;
          } else {
            this.curEnd = false;
          }
          this.currentData = this.currentData.concat(res.data.data);
        } else {
          this.currentData = [];
        }
        this.scroll.refresh();
      });
    },
    /**
     * 处理历史记录
     */
    getHisPage() {
      getH5MeetingPage(this.historySearch).then(res => {
        this.scroll2.finishPullUp();
        if (res.data.code === 200) {
          // 分页数据为每次20条，小于20判断为没有数据
          if (res.data.data.length < this.pageSize) {
            this.historyEnd = true;
          } else {
            this.historyEnd = false;
          }
          this.historyData = this.historyData.concat(res.data.data);
        } else {
          this.historyData = [];
        }
        this.scroll2.refresh();
      });
    },
    getHost() {
      getPocUserInfo().then(res => {
        if (res.data.code === 200) {
          this.host = res.data.data;
          this.$store.commit("setImg", res.data.data.displayPhoto);
          this.$store.commit("setUserName", res.data.data.name);
          this.$store.commit("setSelectHost", [res.data.data]);
        } else {
          this.$toast.text(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (!this.$store.state.app.selectHost.length) {
      this.getHost();
    }
    this.getPage();
    this.getHisPage();
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true,
        probeType: 2,
        pullDownRefresh: true,
        pullUpLoad: true,
        mouseWheel: true
      });
      this.scroll.on("scroll", pos => {
        if (pos.y < this.scroll.maxScrollY - 40 && !this.curEnd) {
          this.down = true;
        } else if (pos.y < 20) {
          this.up = false;
        } else if (pos.y > 20) {
          this.up = true;
        }
      });
      this.scroll.on("pullingDown", () => {
        // console.log('下拉刷新');
        this.curSearch.page = 1;
        getH5MeetingPage(this.curSearch).then(res => {
          this.scroll.finishPullDown();
          if (res.data.code === 200) {
            this.currentData = res.data.data;
          } else {
            this.currentData = [];
          }
          this.scroll.refresh();
        });
      });
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载");
        if (!(this.currentData.length % this.pageSize) && !this.curEnd) {
          this.curEnd = false;
          this.curSearch.page++;
          this.getPage();
        } else {
          this.curEnd = true;
        }
      });
      this.scroll2 = new Bscroll(this.$refs.wrapper2, {
        click: true,
        pullDownRefresh: true,
        pullUpLoad: true,
        mouseWheel: true
      });
      this.scroll2.on("scroll", pos => {
        if (pos.y < this.scroll2.maxScrollY - 40 && !this.historyEnd) {
          this.down = true;
        } else if (pos.y < 20) {
          this.up = false;
        } else if (pos.y > 20) {
          this.up = true;
        }
      });
      this.scroll2.on("pullingDown", () => {
        // console.log('下拉刷新');
        this.historySearch.page = 1;
        getH5MeetingPage(this.historySearch).then(res => {
          this.scroll2.finishPullDown();
          if (res.data.code === 200) {
            this.historyData = res.data.data;
          } else {
            this.historyData = [];
          }
          this.scroll2.refresh();
        });
      });
      this.scroll2.on("pullingUp", () => {
        // console.log("上拉加载");
        if (!(this.historyData.length % this.pageSize) && !this.historyEnd) {
          this.historyEnd = false;
          this.historySearch.page++;
          this.getHisPage();
        } else {
          this.historyEnd = true;
        }
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  height: 38px;
  align-items: flex-end;
  border-bottom: 1px solid #f1f3f5;
  font-size: 15px;
  div {
    padding: 4px 18px;
    position: relative;
  }
  .active {
    font-size: 17px;
    font-weight: 500;
    color: #333333;
  }
  .active::after {
    content: "";
    height: 2px;
    width: 28px;
    border-radius: 1px;
    background: #4e7ceb;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }
}
.contain {
  .swiper {
    flex: 1;
  }
}
.wrapper {
  height: 100%;
}
.tips {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  color: #999;
}
</style>
