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
        ref="swiper"
      >
        <!-- 当前会议 -->
        <div class="nut-swiper-slide">
          <nut-scroller
            :is-un-more="true"
            :is-loading="true"
            :type="'vertical'"
          >
            <div slot="list" class="nut-vert-list-panel">
              <div
                class="nut-vert-list-item"
                v-for="(item, index) of currentData"
                :key="index"
              >
                <card :data="item"></card>
              </div>
            </div>
          </nut-scroller>
        </div>
        <!-- 历史会议 -->
        <div class="nut-swiper-slide">
          <span>page2</span>
        </div>
      </nut-swiper>
    </div>
    <div class="footer">
      <div class="btn-box">
        <nut-button type="primary" :block="true" shape="circle"
          >会议预约</nut-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import card from "_/card";
import lcTitle from "_/title.vue";

export default {
  components: { card, lcTitle },
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
      currentData: new Array(20),
      historyData: []
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
    }
  }
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  height: 32px;
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
</style>
