<template>
  <div class="bread">
    <nut-scroller :stretch="60">
      <span slot="list" class="nut-hor-list-item" @click="search(0, 'back')"
        >组织机构</span
      >
      <span
        slot="list"
        class="nut-hor-list-item"
        @click="search(item.oid, 'back')"
        v-for="item in data"
        :key="item.oid"
        >/{{ item.name }}</span
      >
    </nut-scroller>
  </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    search(oid, type) {
      let obj = {
        oid: oid,
        type: type
      };
      this.$emit("searchOid", obj);
    }
  }
};
</script>

<style lang="scss" scoped>
.bread {
  font-size: 14px;
  color: #4a90e2;
  white-space: nowrap;
}
.bread span:first-child {
  padding-left: 16px;
}
.bread span:last-child {
  padding-right: 16px;
  color: #999999;
}
</style>
