<template>
  <div class="custome-container">
    <div ref="customeChart" :style="mapSize"></div>
  </div>
</template>
<script>
import { Chart } from '../charts/Chart'
export default {
  props: {
    component: Object,
    height: Number,
    width: Number
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    mapSize() {
      console.log(document.body.clientWidth * this.width)
      const styleObj = {
        height: this.height + 'px',
        width: document.body.clientWidth * this.width - 40 + 'px'
      }
      return styleObj
    }
  },
  methods: {
    init() {
      this.chart = new Chart(this.$refs.customeChart)
      if (this.component.option) {
        this.chart.setOption(this.component.option)
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.custome-container{
  height: inherit;
  width: inherit;
}
.chart{
  width: 100%;
}
</style>
