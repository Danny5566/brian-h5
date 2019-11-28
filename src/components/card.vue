<template>
  <div class="card" @click="showDetail">
    <div>
      <span class="title">会议名称</span>
      <span>{{ data.meetingSubject }}</span>
      <span v-if="data.meetingState === 0" class="status reserve">预约中</span>
      <span v-else class="status process">进行中</span>
    </div>
    <div>
      <span class="title">主持人</span>
      <span>{{ data.hostName }}</span>
    </div>
    <div>
      <span class="title">会议类型</span>
      <span>{{ data.meetingType | formatType }}</span>
    </div>
    <div>
      <span class="title">开始时间</span>
      <!-- <span>2019/01/01(周五) 15:30{{}}</span> -->
      <span>{{ data.startTime | formatDate }}</span>
    </div>
    <div>
      <span class="title">结束时间</span>
      <span>{{ data.endTime | formatDate }}</span>
    </div>
    <div>
      <span class="remark">{{ data.remark || "" }}</span>
    </div>
    <div class="around detail">
      <span>详情</span>
      <span class="iconfont icon-right"></span>
    </div>
  </div>
</template>

<script>
import { getWeek } from "@/libs/tools";

export default {
  props: ["data"],
  filters: {
    formatDate: function(val) {
      return val ? getWeek(val) : "";
    },
    formatType: function(val) {
      return val ? "语音会议" : "视频会议";
    }
  },
  methods: {
    showDetail() {
      this.$router.push({ path: `/detail/${this.data.id}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: inline-block;
  width: 70px;
}
.card {
  padding-top: 10px;
  .detail {
    padding-top: 6px;
    font-size: 12px;
    color: #333333;
  }
  .around {
    display: flex;
    justify-content: space-between;

    .icon-right {
      font-size: 12px;
      color: #797979;
    }
  }
}
.card > div {
  padding: 4px 0;
  & > span:nth-child(2) {
    color: #333333;
  }
  .status {
    font-size: 12px;
    float: right;
  }
  .reserve {
    color: #4a90e2;
  }
  .process {
    color: #53dac9;
  }
  .remark {
    color: #999999;
    overflow: hidden;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
