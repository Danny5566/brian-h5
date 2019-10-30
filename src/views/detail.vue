<template>
  <div class="main">
    <!-- <nut-navbar class="navbar" :leftShow="false">
      会议详情
      <a slot="more-icon" @click="isVisible = true">分享</a>
    </nut-navbar>-->
    <lcTitle @sendShare="openShare"></lcTitle>
    <div class="contain reservation">
      <div>
        <div class="label">会议名称</div>
        <div>会议名称1</div>
      </div>
      <div>
        <div class="label">会议类型</div>
        <div>视频会议</div>
      </div>
      <div>
        <div class="label">会议时间</div>
        <div>2019/01/01(周五) 19:30-21:30</div>
      </div>
      <div class="users">
        <div class="label">参会人员(18)</div>
        <userList :data="data.participantInfoDOS"></userList>
      </div>
      <div class="remark">
        <div class="label">会议备注</div>
        <div class="remark-content">
          会议备注会议备注会议备注会议备注会议备注会议备会议备
          注会议备注会议备注会议备注会议备注会议备注会议会议备 备注会。
        </div>
      </div>
    </div>
    <div class="footer double">
      <div>
        <nut-button
          type="gray"
          color="#FFFFFF"
          :block="true"
          shape="circle"
          @click="cancelMeeting"
          >取消预约</nut-button
        >
      </div>
      <div>
        <nut-button type="primary" :block="true" shape="circle"
          >立即开会</nut-button
        >
      </div>
    </div>
    <nut-actionsheet :isVisible="isVisible" @close="switchActionSheet">
      <div slot="custom" class="custom-wrap">
        <span class="iconfont icon-weixin"></span>
        <span class="iconfont icon-dingding"></span>
        <span class="iconfont icon-link"></span>
      </div>
    </nut-actionsheet>
  </div>
</template>

<script>
import userList from "_/user-list.vue";
import lcTitle from "_/title.vue";

export default {
  components: { userList, lcTitle },
  data() {
    return {
      data: {
        startTime: "",
        endTime: "",
        meetingSubject: "",
        hostName: "",
        hostDisplayPhoto: "",
        meetingState: 0,
        meetingType: 0,
        participantInfoDOS: [
          { uid: 1, name: "盖伦", displayPhoto: "" },
          { uid: 2, name: "艾希", displayPhoto: "" },
          { uid: 3, name: "亚瑟", displayPhoto: "" },
          { uid: 4, name: "嘉文四世", displayPhoto: "" },
          { uid: 5, name: "亚索", displayPhoto: "" },
          { uid: 6, name: "琴女", displayPhoto: "" }
        ]
      },
      isVisible: false
    };
  },
  methods: {
    cancelMeeting() {
      this.$dialog({
        title: "取消预约",
        content: "你正在取消会议操作，确定取消会议吗？",
        onOkBtn() {
          //确定按钮点击事件
          alert("okBtn");
          this.close(); //关闭对话框
        }
      });
    },
    switchActionSheet() {
      this.isVisible = !this.isVisible;
    },
    openShare() {
      this.isVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  .contain {
    padding: 6px 20px;
    .remark {
      flex-direction: column;
      .remark-content {
        background: #f7f7f7;
        font-size: 12px;
        padding: 10px;
        border-radius: 4px;
        margin-top: 6px;
      }
    }
    .users {
      flex-direction: column;
      div:nth-child(2) {
        padding: 26px 0 0 0;
      }
    }
    & > div {
      padding: 9px 0;
      display: flex;
      color: #333333;
      .label {
        color: #999999;
      }
      div:nth-child(2) {
        padding: 0 30px;
      }
    }
    &.reservation {
      background-image: url("~@/assets/images/reservation.png"),
        url("~@/assets/images/bg-decoration.png");
      background-size: 131px 74px, 80px 126px;
      background-repeat: no-repeat;
      background-position: right 0px top 16px, left 12px bottom 32px;
    }
    &.process {
      background-image: url("~@/assets/images/process.png"),
        url("~@/assets/images/bg-decoration.png");
      background-size: 131px 74px, 80px 126px;
      background-repeat: no-repeat;
      background-position: right 0px top 16px, left 12px bottom 32px;
    }
    &.end {
      background-image: url("~@/assets/images/end.png"),
        url("~@/assets/images/bg-decoration.png");
      background-size: 131px 74px, 80px 126px;
      background-repeat: no-repeat;
      background-position: right 0px top 16px, left 12px bottom 32px;
    }
  }
  .double {
    display: flex;
    justify-content: space-around;
    & > div {
      width: 46vw;
    }
  }
  .custom-wrap {
    height: 168px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &::before {
      content: "分享至";
      color: #999999;
      font-size: 12px;
      position: absolute;
      top: 16px;
    }
    .iconfont {
      font-size: 42px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .icon-weixin {
      color: #62b900;
      &::after {
        content: "微信好友";
        font-size: 12px;
        color: #333333;
      }
    }
    .icon-dingding {
      color: #3ba2eb;
      &::after {
        content: "钉钉好友";
        font-size: 12px;
        color: #333333;
      }
    }
    .icon-link {
      color: #666767;
      &::after {
        content: "复制链接";
        font-size: 12px;
        color: #333333;
      }
    }
  }
}
</style>
