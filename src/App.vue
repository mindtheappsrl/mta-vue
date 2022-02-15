<template>
  <div class="app">
<!--    <div id="horizontal-scrollbar-test" style="width: 300px">-->
<!--      <MtaHorizontalScrollbar :container-ref="horizontalScrollbarTest.container"></MtaHorizontalScrollbar>-->
<!--      <div ref="container1" style="overflow-x: auto">-->
<!--        <div style="width: 600px; height: 100px; background-color: #ff0000">-->
<!--          test test test-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div id="scheduler-test">-->
<!--      <MtaScheduler style="height: 300px"></MtaScheduler>-->
<!--    </div>-->
    <MtaSurveys></MtaSurveys>
  </div>
</template>

<script>
export default {
  components: {},

  data () {
    return {
      horizontalScrollbarTest: {
        container: null
      }
    };
  },
  async mounted () {
    // this.horizontalScrollbarTest.container = this.$refs.container1;
  }
};
</script>

<style lang="scss">
</style>
