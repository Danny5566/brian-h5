<template>
  <div class="main">
    <div class="contain" ref="wrapper">
      <div v-if="!data.meetingSubject" class="error">未找到当前会议</div>
      <div v-else :class="[basicClass, activeClass]">
        <div class="meeting-name">
          <div>{{ data.meetingSubject }}</div>
        </div>
        <div>
          <div class="label">会议类型</div>
          <div>{{ data.meetingType | typeFilter }}</div>
        </div>
        <div>
          <div class="label">开始时间</div>
          <div>{{ data.startTime | dateFilter }}</div>
        </div>
        <div>
          <div class="label">结束时间</div>
          <div>{{ data.endTime | dateFilter }}</div>
        </div>
        <div class="users">
          <div class="label">
            参会人员({{
              data.participantInfoDOS ? data.participantInfoDOS.length : 0
            }})
          </div>
          <userList
            class="scale"
            :data="data.participantInfoDOS ? data.participantInfoDOS : []"
          ></userList>
        </div>
        <div class="remark">
          <div class="label">会议备注</div>
          <div class="remark-content">{{ data.remark }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn-box">
        <nut-button
          :type="data.meetingSubject ? 'primary' : 'gray'"
          style="color: #fff;"
          :block="true"
          shape="circle"
          @click="join"
          >参加会议</nut-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import CallApp from "callapp-lib";
import * as dd from "dingtalk-jsapi";

import userList from "_/user-list.vue";
import { getWeek } from "@/libs/tools";

import { getMeetInfo, getSign } from "@/api/data";

export default {
  components: { userList },
  data() {
    return {
      data: {
        participantInfoDOS: [
          // { uid: 1, name: "盖伦", displayPhoto: "" },
          // { uid: 2, name: "艾希", displayPhoto: "" },
          // { uid: 3, name: "亚瑟", displayPhoto: "" },
          // { uid: 4, name: "嘉文四世", displayPhoto: "" },
          // { uid: 5, name: "亚索", displayPhoto: "" },
          // { uid: 6, name: "琴女", displayPhoto: "" }
        ]
      },
      basicClass: "bg-basic",
      activeClass: "",
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
      },
      option: {
        scheme: {
          protocol: "imbcloud"
        },
        appstore: "",
        yingyongbao: "",
        fallback: "https://ai.imbcloud.cn/h5",
        timeout: 2000
      }
    };
  },
  filters: {
    typeFilter: function(val) {
      return val ? "语音会议" : "视频会议";
    },
    dateFilter: function(val) {
      return val ? getWeek(val) : "";
    }
  },
  methods: {
    ddShare() {
      let that = this;
      /* eslint-disable no-undef */
      if (dd.env.platform === "notInDingTalk") {
        // console.log("当前非钉钉环境");
        return false;
      }
      dd.ready(function() {
        dd.biz.navigation.setRight({
          show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
          control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
          text: "", //控制显示文本，空字符串表示显示默认文本
          onSuccess: function() {
            //如果control为true，则onSuccess将在发生按钮点击事件被回调
            dd.biz.util.share({
              type: 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
              url: location.href,
              content: that.data.remark,
              title: that.data.meetingSubject,
              image: "",
              onSuccess: function() {
                //onSuccess将在分享完成之后回调
                /**/
              },
              onFail: function(err) {
                this.$toast.text(err);
              }
            });
          },
          onFail: function(err) {
            this.$toast.text(err);
          }
        });
      });
    },
    wxShare() {
      let that = this; // 保存vue对象
      /* eslint-disable no-undef */
      let obj = { url: location.href.split("#")[0] };
      if (!this.environment.isWeixin) {
        // console.log("当前非微信环境");
        return false;
      }
      // let obj = { url: "http://dev.imbcloud.cn/h5/#/share/T9UWbBLPr" };
      getSign(obj).then(res => {
        if (res.data.code === 200) {
          wx.config({
            debug: false, // 是否开启debug
            appId: res.data.data.appId,
            timestamp: res.data.data.timestamp,
            nonceStr: res.data.data.nonceStr,
            signature: res.data.data.signature,
            jsApiList: [
              "updateAppMessageShareData",
              "onMenuShareAppMessage" // 分享给朋友，新api
            ]
          });

          wx.ready(() => {
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
            wx.onMenuShareAppMessage(share);
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
    join() {
      let that = this;
      if (!this.data.meetingSubject) {
        return false;
      }
      // 判断不再应用中时候的处理，唤醒客户端
      const lib = new CallApp(this.option);
      lib.open({
        path: "meeting/join",
        param: {
          id: that.data.id
        },
        callback: function() {
          window.location.href = "https://ai.imbcloud.cn/h5";
          return false;
        }
      });
    },
    getData(id) {
      getMeetInfo(id).then(res => {
        if (res.data.code === 200) {
          this.data = res.data.data;
          // 判断是否有hostId, 插入到参会人队列
          if (res.data.data.hostId) {
            let tempObj = {
              displayPhoto: res.data.data.hostDisplayPhoto,
              name: res.data.data.hostName,
              organizationName: res.data.data.hostOrganizationName
            };
            this.data.participantInfoDOS
              ? this.data.participantInfoDOS.unshift(tempObj)
              : "";
          }
          // 判断状态显示背景
          switch (res.data.data.meetingState) {
            case 0:
              this.activeClass = "reservation";
              break;
            case 1:
              this.activeClass = "process";
              break;
            case 2:
              this.activeClass = "end";
              break;
            default:
              break;
          }
        } else {
          this.$toast.text(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.getData(this.$route.params.id);
    this.wxShare();
    this.ddShare();
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
  background-image: url("~@/assets/images/bg-share.png");
  background-size: 100vw 250px;
  background-repeat: no-repeat;
  background-position: left 0px top 0px;
  background-color: #f9f9f9;
  .error {
    text-align: center;
  }
  .contain {
    padding: 10px;
    margin: 60px 25px 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px #adb5b9;
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
        transform: scale(0.9);
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
    .meeting-name {
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      display: flex;
      justify-content: center;
      border-bottom: 2px dashed #e3ebf0;
    }
    .bg-basic {
      background-size: 131px 74px;
      background-repeat: no-repeat;
      background-position: right -6px top 12px;
      // padding: 10px;
    }
    .reservation {
      background-image: url("~@/assets/images/reservation.png");
    }
    .process {
      background-image: url("~@/assets/images/process.png");
    }
    .end {
      background-image: url("~@/assets/images/end.png");
    }
  }
}
</style>
