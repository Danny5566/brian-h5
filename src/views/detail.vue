<template>
  <div class="main">
    <lcTitle @sendShare="openShare"></lcTitle>
    <div class="contain" ref="wrapper">
      <div class="reservation">
        <div>
          <div class="label">会议名称</div>
          <div>{{ data.meetingSubject }}</div>
        </div>
        <div>
          <div class="label">会议类型</div>
          <div>{{ data.meetingType | formatType }}</div>
        </div>
        <div>
          <div class="label">开始时间</div>
          <div>{{ data.startTime | formatDate }}</div>
        </div>
        <div>
          <div class="label">结束时间</div>
          <div>{{ data.endTime | formatDate }}</div>
        </div>
        <div class="users">
          <div class="label">
            参会人员({{
              data.participantInfoDOS ? data.participantInfoDOS.length : 0
            }})
          </div>
          <userList :data="data.participantInfoDOS"></userList>
        </div>
        <div class="remark">
          <div class="label">会议备注</div>
          <div class="remark-content">{{ data.remark || "" }}</div>
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
          @click="cancelMeeting(meetingId)"
          >取消预约</nut-button
        >
      </div>
      <div>
        <nut-button
          type="primary"
          :block="true"
          shape="circle"
          @click="startMeeting"
          >立即开会</nut-button
        >
      </div>
    </div>
    <nut-actionsheet :isVisible="isVisible" @close="switchActionSheet">
      <div slot="custom" class="custom-wrap">
        <span class="iconfont icon-weixin" @click="wxShare"></span>
        <span class="iconfont icon-dingding"></span>
        <span class="iconfont icon-link" @click="copy"></span>
      </div>
    </nut-actionsheet>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

import userList from "_/user-list.vue";
import lcTitle from "_/title.vue";
import { getWeek } from "@/libs/tools";

import { getMeetInfo, delMeet, startNowMeeting, getSign } from "@/api/data";

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
          // { uid: 1, name: "盖伦", displayPhoto: "" },
          // { uid: 2, name: "艾希", displayPhoto: "" },
          // { uid: 3, name: "亚瑟", displayPhoto: "" },
          // { uid: 4, name: "嘉文四世", displayPhoto: "" },
          // { uid: 5, name: "亚索", displayPhoto: "" },
          // { uid: 6, name: "琴女", displayPhoto: "" }
        ]
      },
      isVisible: false,
      meetingId: "",
      // 当前网页环境
      environment: {
        isAndroid: Boolean(navigator.userAgent.match(/android/gi)),
        isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)),
        isIpad: Boolean(navigator.userAgent.match(/ipad/gi)),
        isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi)),
        isAli: Boolean(navigator.userAgent.match(/AlipayClient/gi)),
        isPhone: Boolean(
          /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
        )
      }
    };
  },
  created() {
    this.meetingId = this.$route.params.id;
  },
  filters: {
    formatDate: function(val) {
      return val ? getWeek(val) : "";
    },
    formatType: function(val) {
      return val ? "语音会议" : "视频会议";
    }
  },
  methods: {
    copy() {
      let that = this;
      let uri = location.href.replace("detail", "share");
      this.$copyText(uri).then(
        function() {
          that.$toast.text("复制成功！");
          that.isVisible = false;
        },
        function(e) {
          that.$toast.text(`复制失败: ${e}`);
        }
      );
    },
    wxShare() {
      let that = this; // 保存vue对象
      /* eslint-disable no-undef */
      let obj = { url: location.href.split("#")[0] };
      getSign(obj).then(res => {
        if (res.data.code === 200) {
          wx.config({
            debug: false, // 是否开启debug
            appId: res.data.data.appId,
            timestamp: res.data.data.timestamp,
            nonceStr: res.data.data.nonceStr,
            signature: res.data.data.signature,
            jsApiList: [
              "updateAppMessageShareData" // 分享给朋友，新api
            ]
          });

          wx.ready(function() {
            //需在用户可能点击分享按钮前就先调用
            const share = {
              title: that.data.meetingSubject, // 分享标题
              desc: that.data.remark, // 分享描述
              link:
                location.href.split("#")[0] + "#" + location.href.split("#")[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "", // 分享图标
              success: function() {
                // 设置成功
              }
            };
            wx.updateAppMessageShareData(share);
          });

          wx.error(function(res) {
            that.$toast.text(res);
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });
        } else {
          this.$toast.text(res.data.msg);
        }
      });
    },
    startMeeting() {
      let data = {
        meetingId: this.meetingId
      };
      startNowMeeting(data).then(res => {
        if (res.data.code === 200) {
          // console.log("立即开会，跳转app");
        } else {
          this.$toast.text(res.data.msg);
        }
      });
    },
    cancelMeeting(meetingId) {
      let that = this;
      this.$dialog({
        title: "取消预约",
        content: "你正在取消会议操作，确定取消会议吗？",
        onOkBtn() {
          //确定按钮点击事件
          delMeet(meetingId).then(res => {
            if (res.data.code === 200) {
              that.$router.push({ name: "record" });
            } else {
              that.$toast.text(res.data.msg);
            }
          });
          this.close(); //关闭对话框
        }
      });
    },
    switchActionSheet() {
      this.isVisible = !this.isVisible;
    },
    openShare() {
      this.isVisible = true;
    },
    getInfo(param) {
      getMeetInfo(param).then(res => {
        if (res.data.code === 200) {
          this.data = res.data.data;
          let host = {
            uid: res.data.data.hostId,
            tel: res.data.data.hostTel,
            name: res.data.data.hostName,
            displayPhoto: res.data.data.hostDisplayPhoto
          };
          this.data.participantInfoDOS.unshift(host);
        } else {
          this.data = {};
        }
      });
    }
  },
  mounted() {
    // console.log("id", this.$router.params.id);
    this.getInfo(this.meetingId);
    this.wxShare();
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true
      });
    });
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
        line-height: 1.5;
      }
    }
    .users {
      flex-direction: column;
      div:nth-child(2) {
        padding: 26px 0 0 0;
      }
    }
    & > div > div {
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
