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

import userList from "_/user-list.vue";
import { getWeek } from "@/libs/tools";

import { getMeetInfo } from "@/api/data";

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
      activeClass: ""
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
    join() {
      if (!this.data.meetingSubject) {
        return false;
      }
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
