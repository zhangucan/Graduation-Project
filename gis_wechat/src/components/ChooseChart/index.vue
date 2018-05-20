<template>
  <el-row style="margin-top:10px;">
    <el-col :span="8">
      <el-container class="chart-list">
        <el-aside style="width:90px;">
          <el-menu @select="changeChartList">
            <el-menu-item index="bar">
              <span slot="title">柱状图</span>
            </el-menu-item>
            <el-menu-item index="line">
              <span slot="title">线图</span>
            </el-menu-item>
            <el-menu-item index="pie">
              <span slot="title">饼图</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-row>
            <transition-group name="slide-fade">
              <el-col :span="8" v-for="(item, index) in currentChartList.children" :key="index" >
                <el-card :body-style="{ padding: '0px' }" style="cursor:pointer;margin:10px;" :class= "{ chartOn: item.type == chartType }">
                  <img :src="formatImg(item)" class="image" @click="chooseChart(item)">
                  <div class="chart-name">
                    <span >{{ item.name }}</span>
                  </div>
                </el-card>
              </el-col>
            </transition-group>
          </el-row>
        </el-main>
      </el-container>
    </el-col>
    <el-col :span="16">
      <el-container class="chart-detail">
        <el-main>
          <div ref="customeChart" class="chart"></div>
        </el-main>
         <el-footer style="height:50px;background-color: #edf2f6;; text-align: center;">
           <el-row class="margin-top5">
            <el-button type="primary" @click="editChart">图表编辑</el-button>
          </el-row>
         </el-footer>
      </el-container>
    </el-col>
  </el-row>
</template>
<script>
import { Chart } from '../charts/Chart'
export default {
  data() {
    return {
      chartList: this.$store.state.bigscreen.chartList,
      currentChartList: [],
      chartType: {
        type: '',
        name: ''
      },
      chart: null
    }
  },
  methods: {
    changeChartList(type) {
      this.chartType.type = type
      this.currentChartList = this.chartList.find(item => {
        return item.type === type
      })
    },
    formatImg(item) {
      return `../../../static/charts/${item.img}.png`
    },
    chooseChart(item) {
      if (this.chart) this.chart.clear()
      this.chartType.name = item.type
      this.chart = new Chart(this.$refs.customeChart)
      this.chart.setChartOption()(this.chartType)
    },
    editChart() {
      this.$store.dispatch('EditChart', this.chartType)
      this.$root.Bus.$emit('changeChartView', 'EditChart')
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-list{
  height: 80vh;
  background-color: #edf2f6;
  
}
.chart-detail{
  height: 80vh;
  background-color: #CAD3DB;
}
.el-menu{
  height: 80vh;
  width: 90px;
  background-color: rgba($color: #000000, $alpha: 0);
}
.el-main{
  height: 100%;
}
.margin10{
  margin: 10px;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.chart-name {
  padding: 5px;
  font-size: 14px;
  text-align: center;
}
.chartOn {
   box-shadow: 0 2px 12px 0 rgba(103,194,58,1);
}
.chart{
  height: inherit;
}
.margin-top10{
  margin-top: 10px;
}
.margin-top5{
  margin-top: 5px;
}
</style>
