<template>
  <div class="card">
    <div>
      会议名称
      <span>会议名称</span>
    </div>
    <div>
      主持人
      <span>玉春阳</span>
    </div>
    <div>
      会议类型
      <span>视频会议</span>
    </div>
    <div class="around">
      <span>2019/01/01(周五) 19:30—18:30</span>
      <span class="status">预约中</span>
    </div>
    <div>
      <span class="remark"
        >会议备注会议备注备议备注备没会议备注时不现斯大林放假啦的理解</span
      >
    </div>
    <div class="around detail" @click="showDetail">
      <span>详情</span>
      <span class="iconfont icon-right"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    showDetail() {
      this.$router.push({ name: "detail" });
      console.log("showDetail");
    }
  }
};
</script>

<style lang="scss" scoped>
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
    .status {
      font-size: 12px;
      color: #53dac9;
    }
    .icon-right {
      font-size: 12px;
      color: #797979;
    }
  }
}
.card > div {
  padding: 4px 0;
  & > span {
    color: #333333;
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
