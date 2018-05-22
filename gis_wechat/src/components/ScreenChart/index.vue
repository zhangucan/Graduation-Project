<template>
  <div class="custome-container">
    <div ref="customeChart" class="chart"></div>
  </div>
</template>
<script>
import { Chart } from '../charts/Chart'
export default {
  props: {
    component: Object
  },
  data() {
    return {
      chart: null
    }
  },
  methods: {
    init() {
      this.chart = new Chart(this.$refs.customeChart)
      if (this.component.option) {
        this.chart.setChartOption()(this.component.chartType)
        console.log(123)
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
  height: 100%;
  width: 100%;
}
.chart{
  height: 100%;
  width: 100%;
}
</style>
