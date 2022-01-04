<template>
  <div ref="fakeScrollbar" id="fakeScrollbar">
    <div ref="fakeScrollbarContent">&nbsp;</div>
  </div>
</template>

<script>
export default {
  name: "MtaHorizontalScrollbar",
  props: {
    containerRef: {
      type: HTMLDivElement,
      default: {}
    },
  },
  watch: {
    containerRef: {
      handler() {
        this.updateScrollbar();
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
      this.initScrollbar()
  },
  methods: {
    initScrollbar() {
      if(this.$refs.fakeScrollbar && this.$refs.fakeScrollbarContent && this.containerRef) {
        if(this.containerRef.children[0] && this.containerRef.children[0].offsetWidth > 0) {
          // Set width of fake scrollbar content to the width of the container
          this.$refs.fakeScrollbarContent.style.width = this.containerRef.children[0].offsetWidth + "px"
        }

        // Set event listener for scroll left event
        this.$nextTick(() => {
          this.$refs.fakeScrollbar.onscroll = () => {
            this.containerRef.scrollLeft = this.$refs.fakeScrollbar.scrollLeft
          }
          this.containerRef.onscroll = () => {
            this.$refs.fakeScrollbar.scrollLeft = this.containerRef.scrollLeft
          }
        })
      }
    },
    updateScrollbar() {
      this.initScrollbar()
    }
  }
}
</script>

<style>
#fakeScrollbar {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

#fakeScrollbar div {
  font-size: 1px;
  line-height: 1px;
}
</style>
