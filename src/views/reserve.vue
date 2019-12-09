<template>
  <div class="main">
    <lcTitle></lcTitle>
    <div class="contain reserve" ref="wrapper">
      <!-- 以下div用作包裹滚动对象 -->
      <div>
        <div class="item reset-item">
          <div class="label">会议主题</div>
          <nut-textinput
            v-model="formData.meetingSubject"
            class="nut-input"
            :hasBorder="false"
            :clearBtn="false"
          ></nut-textinput>
        </div>
        <div class="item between">
          <div class="label">会议类型</div>
          <div style="border-radius: 4px;">
            <nut-button
              small
              :type="formData.meetingType ? 'light' : 'primary'"
              @click="changeType(0)"
              style="border-radius: 4px 0 0 4px;"
              >视频会议</nut-button
            >
            <nut-button
              small
              :type="formData.meetingType ? 'primary' : 'light'"
              @click="changeType(1)"
              style="border-radius: 0 4px 4px 0;"
              >语音会议</nut-button
            >
          </div>
        </div>
        <div class="item" @click="showTime('isVisibleStart')">
          <div class="label">开始时间</div>
          <div class="time">
            <span>{{ formData.startTime | dateFilter }}</span>
            <span class="iconfont icon-calendar"></span>
          </div>
        </div>
        <div class="item" @click="showTime('isVisibleEnd')">
          <div class="label">结束时间</div>
          <div class="time">
            <span>{{ formData.endTime | dateFilter }}</span>
            <span class="iconfont icon-calendar"></span>
          </div>
        </div>
        <div class="item reset-item">
          <div class="label">会议备注</div>
          <nut-textinput
            v-model="formData.remark"
            class="nut-input"
            :hasBorder="false"
            :clearBtn="false"
            @blur="blur"
          ></nut-textinput>
        </div>
        <div class="item column-item">
          <div class="lable">主持人</div>
          <div class="host-item user-list">
            <div
              v-if="!host.displayPhoto"
              class="avatar"
              :style="avatarSelect"
            ></div>
            <div
              v-if="host.displayPhoto"
              class="avatar"
              :style="{
                backgroundImage: `url(http://oss.imbcloud.cn/image/${host.displayPhoto})`
              }"
            ></div>
            <div class="name">{{ host.name }}</div>
          </div>
          <!-- <hostList :data="host" @sendRemoveHost="getRemoveHost"></hostList> -->
        </div>
        <div class="item column-item">
          <div class="label">参会人员({{ participantInfoDOS.length }})</div>
          <userList
            :data="participantInfoDOS"
            :type="'edit'"
            @sendRemoveUser="getRemoveUser"
          ></userList>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn-box">
        <nut-button
          :disabled="!isActive"
          :type="isActive ? 'primary' : 'gray'"
          color="#FFFFFF"
          :block="true"
          shape="circle"
          @click="submit"
          >确定预约</nut-button
        >
      </div>
    </div>
    <nut-datepicker
      v-if="isVisibleStart"
      :is-visible="isVisibleStart"
      title="请选择开始时间"
      type="datetime"
      endDate="2099-01-01"
      :defaultValue="defaultTime"
      @close="switchPicker('isVisibleStart')"
      @choose="setChooseStart"
    ></nut-datepicker>
    <nut-datepicker
      v-if="isVisibleEnd"
      :is-visible="isVisibleEnd"
      title="请选择结束时间"
      type="datetime"
      endDate="2099-01-01"
      :defaultValue="defaultTime"
      @close="switchPicker('isVisibleEnd')"
      @choose="setChooseEnd"
    ></nut-datepicker>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import lcTitle from "_/title.vue";
import userList from "_/user-list.vue";
import { parseTime, getWeek, getDateDiff } from "@/libs/tools";
// eslint-disable-next-line no-unused-vars
import { addMeeting } from "@/api/data";

export default {
  components: { lcTitle, userList },
  data() {
    return {
      avatarSelect: {
        backgroundImage:
          "url(" + require("@/assets/images/avatar-select.png") + ")"
      },
      isVisibleStart: false,
      isVisibleEnd: false,
      defaultTime: "",
      formData: {
        startTime: "",
        endTime: "",
        meetingSubject: "",
        meetingType: 0,
        hostId: "",
        participantsTels: [],
        remark: ""
      },
      participantInfoDOS: [
        // { uid: 1, name: "盖伦", displayPhoto: "" },
        // { uid: 2, name: "艾希", displayPhoto: "" },
        // { uid: 3, name: "亚瑟", displayPhoto: "" },
        // { uid: 4, name: "嘉文四世", displayPhoto: "" },
        // { uid: 5, name: "亚索", displayPhoto: "" },
        // { uid: 6, name: "琴女", displayPhoto: "" }
      ],
      host: {
        // uid: 1,
        // name: "盖伦",
        // displayPhoto: ""
      }
    };
  },
  created() {
    this.$store.state.app.selectHost.length > 0
      ? (this.host = this.$store.state.app.selectHost[0])
      : "";
    this.$store.state.app.selectUser.length > 0
      ? (this.participantInfoDOS = this.$store.state.app.selectUser)
      : "";
    this.formData = this.$store.state.app.formData;
    // 判断下是否有主持人，有的话，处理下参会人员
    if (this.host.uid && this.participantInfoDOS.length) {
      this.participantInfoDOS.forEach((element, index) => {
        if (element.uid === this.host.uid) {
          this.participantInfoDOS.splice(index, 1);
        }
      });
    }
  },
  computed: {
    isActive: function() {
      // 校验表单信息
      if (
        this.formData.startTime &&
        this.formData.endTime &&
        this.formData.meetingSubject &&
        this.formData.remark &&
        this.participantInfoDOS.length &&
        this.host.uid
      ) {
        return true;
      } else {
        return false;
      }
    },
    updateFormData: function() {
      return this.$store.commit("setFormData", this.formData);
    }
  },
  filters: {
    dateFilter: function(val) {
      return val ? getWeek(val) : "";
    }
  },
  methods: {
    changeType(val) {
      this.formData.meetingType = val;
    },
    blur() {
      // 解决微信软键盘收缩后页面不恢复正常
      window.scrollTo(0, 0);
    },
    showTime(val) {
      // 选择时间时，取消所有input的焦点, 软键盘隐藏
      document.querySelectorAll("input").forEach(function(item) {
        item.blur();
      });
      this[val] = true;
    },
    switchPicker(param) {
      this.defaultTime = parseTime(new Date(), "{y}-{m}-{d} {h}:{i}");
      this[`${param}`] = !this[`${param}`];
    },
    clickTimePicker() {},
    setChooseStart(val) {
      if (this.validateDate(val[5], "start")) {
        this.formData.startTime = val[5];
      }
    },
    setChooseEnd(val) {
      if (this.validateDate(val[5], "end")) {
        this.formData.endTime = val[5];
      }
    },
    validateDate(val, type) {
      if (val < this.defaultTime) {
        this.$toast.text("会议时间最早为5分钟后");
        return false;
      } else if (this.formData.startTime && type === "end") {
        if (this.formData.startTime > val) {
          this.$toast.text("结束时间不能小于开始时间");
          return false;
        } else {
          return true;
        }
      } else if (this.formData.endTime && type === "start") {
        if (val > this.formData.endTime) {
          this.$toast.text("开始时间不能大于结束时间");
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    // 移除当前选中的host
    getRemoveHost() {
      this.host = {};
    },
    getRemoveUser(id) {
      this.participantInfoDOS.forEach((item, index) => {
        if (item.uid === id) {
          this.participantInfoDOS.splice(index, 1);
        }
      });
    },
    submit() {
      // this.formData.hostId = this.host.uid;
      this.formData.hostTel = this.host.tel;
      this.formData.participantsTels = [];
      this.participantInfoDOS.forEach(item => {
        this.formData.participantsTels.push(item.tel);
      });
      let startTime = getDateDiff(this.formData.startTime);
      let endTime = getDateDiff(this.formData.endTime);
      // formdata会同步更新store所以这里不用formdata直接修改开始时间和结束时间
      let data = {
        startTime: startTime,
        endTime: endTime,
        meetingSubject: this.formData.meetingSubject,
        meetingType: this.formData.meetingType,
        // hostId: this.formData.hostId,
        hostTel: this.formData.hostTel,
        participantsTels: JSON.stringify(this.formData.participantsTels),
        remark: this.formData.remark
      };
      addMeeting(data).then(res => {
        if (res.data.code === 200) {
          this.$store.commit("setMeetingId", res.data.data);
          let formData = {
            startTime: "",
            endTime: "",
            meetingSubject: "",
            meetingType: 0,
            // hostId: "",
            hostTel: "",
            participantsTels: [],
            remark: ""
          };
          this.$store.commit("setFormData", formData);
          this.$store.commit("setSelectUser", []);
          this.$router.replace({
            name: "detail",
            params: {
              id: res.data.data
            }
          });
          // this.$toast.text(res.data.msg);
        } else {
          this.$toast.text(res.data.msg);
        }
      });
    }
  },
  mounted() {
    // 默认时间为当前时间推后5分钟
    let date = new Date();
    this.defaultTime = parseTime(
      date.getTime() + 300000,
      "{y}-{m}-{d} {h}:{i}"
    );
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.host-item {
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
}
.avatar {
  width: 52px;
  height: 52px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 100%;
}
.contain .item {
  display: flex;
  align-items: center;
  padding: 0px 20px;
  min-height: 52px;
  border-bottom: 1px solid #f1f3f5;
  .label {
    color: #333333;
  }
  .time {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  &.column-item {
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding: 20px;
    .user-list {
      margin-top: 6px;
    }
  }
  &:last-child {
    border: none;
  }
}
.reset-item {
  .nut-input {
    flex: 1;
  }
}
.between {
  justify-content: space-between;
}
</style>
