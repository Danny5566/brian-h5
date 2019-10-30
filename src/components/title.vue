<template>
  <nut-navbar
    :leftShow="data.back"
    :rightShow="data.avatar || data.share"
    @on-click-back="back"
    class="navbar"
  >
    {{ data.title }}
    <a v-if="data.avatar" slot="more-icon">
      <nut-avatar
        @activeAvatar="showAbout"
        bgImage="~@/assets/images/avatar-select.png"
      ></nut-avatar>
    </a>
    <a v-if="data.share" slot="more-icon" @click="share">分享</a>
  </nut-navbar>
</template>

<script>
export default {
  name: "lc-title",
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.data.title = this.$store.state.app.title;
    this.data.avatar = this.$store.state.app.avatar;
    this.data.share = this.$store.state.app.share;
    this.data.back = this.$store.state.app.back;
    this.data.lastRoute = this.$store.state.app.lastRoute;
  },
  methods: {
    showAbout() {
      this.$router.push({
        name: "about"
      });
    },
    back() {
      this.$router.push({ name: this.data.lastRoute });
    },
    share() {
      this.$emit("sendShare", true);
    }
  }
};
</script>

<style></style>
