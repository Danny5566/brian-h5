<template id="t">
  <div class="container">
    <input type="text" v-model="message" />
    <button type="button" @click="doCopy">Copy!</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      message: "Copy These Text"
    };
  },
  methods: {
    doCopy: function() {
      this.$copyText(this.message).then(
        function(e) {
          alert("Copied");
          console.log(e);
        },
        function(e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    }
  }
};
</script>
