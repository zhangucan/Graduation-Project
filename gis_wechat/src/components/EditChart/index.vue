<template>
  <el-row style="margin-top:10px;">
    <el-col :span="7">
      <el-container class="chart-data">
        <el-header class="panel-left-heading" style="height: 30px">
          <h4 class="panel-left-title">图表数据</h4>
        </el-header>
        <el-main class="panel-body" style="padding:0px;">
          <hot-table style="font-size: 14px;color: #6b6b6b;" ref="hotTable" :root="root" :data="chartData" :settings="hotSettings"></hot-table>
        </el-main>
        <el-footer style="height:50px;background-color: #edf2f6; text-align: center;">
           <el-row class="margin-top5">
            <el-button @click="init">恢复样例数据</el-button>
          </el-row>
        </el-footer>
      </el-container>
    </el-col>
    <el-col :span="12">
      <el-container class="chart-detail">
        <el-main>
          <div ref="customeChart" class="chart"></div>
        </el-main>
        <el-footer style="height:50px;background-color: #edf2f6;; text-align: center;">
           <el-row class="margin-top5">
            <el-button @click="chooseChart">重选图表</el-button>
            <el-button  type="primary">确定</el-button>
          </el-row>
        </el-footer>
      </el-container>
    </el-col>
    <el-col :span="5">
      <el-container class="chart-option">
        <el-main style="padding:0">
          <el-row>
            <div class="option-header">图表基本信息</div>
            <div class="option-container">
              <el-form class="margin-top10" :model="title" label-width="100px">
                <el-form-item label="主标题">
                  <el-input size="mini" v-model="title.text" placeholder="请输入主标题" style="width: 50%;"></el-input>
                </el-form-item>
                <el-form-item label="副标题">
                  <el-input size="mini" v-model="title.subtext" placeholder="请输入副标题" style="width: 50%;"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
          <el-row>
            <div class="option-header">坐标系网格</div>
            <div class="option-container">
              <el-form class="margin-top10" :model="grid" label-width="100px">
                <el-form-item label="左边距">
                  <el-input-number size="mini" v-model="grid.left" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="右边距">
                  <el-input-number size="mini" v-model="grid.right" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="上边距">
                  <el-input-number size="mini" v-model="grid.top" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="下边距">
                  <el-input-number size="mini" v-model="grid.bottom" controls-position="right" :min="0"></el-input-number>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
          <el-row>
            <div class="option-header">x轴</div>
            <div class="option-container">
              <el-form class="margin-top10" :model="xAxis" label-width="100px" >
                <el-form-item label="轴名称">
                  <el-input size="mini" v-model="xAxis.name" placeholder="请输入轴名称" style="width: 50%;"></el-input>
                </el-form-item>
                <el-form-item label="名称位置">
                  <el-radio-group v-model="xAxis.nameLocation"  size="mini">
                    <el-radio-button label="开始"></el-radio-button>
                    <el-radio-button label="中间"></el-radio-button>
                    <el-radio-button label="结尾"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="轴单位">
                  <el-select v-model="xAxis.axisLabel.formatter" placeholder="默认" size="mini">
                    <el-option label="默认" value="{value}"></el-option>
                    <el-option label="%" value="{value} %"></el-option>
                    <el-option label="㎡" value="{value} ㎡"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="旋转角度">
                  <el-input-number size="mini" v-model="xAxis.nameRotate" controls-position="right"></el-input-number>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
          <el-row>
            <div class="option-header">y轴</div>
            <div class="option-container">
              <el-form class="margin-top10" :model="yAxis" label-width="100px" >
                <el-form-item label="轴名称">
                  <el-input size="mini" v-model="yAxis.name" placeholder="请输入轴名称" style="width: 50%;"></el-input>
                </el-form-item>
                <el-form-item label="名称位置">
                  <el-radio-group v-model="yAxis.nameLocation"  size="mini">
                    <el-radio-button label="开始"></el-radio-button>
                    <el-radio-button label="中间"></el-radio-button>
                    <el-radio-button label="结尾"></el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="轴单位">
                  <el-select v-model="yAxis.axisLabel.formatter" placeholder="默认" size="mini">
                    <el-option label="默认" value="{value}"></el-option>
                    <el-option label="%" value="{value} %"></el-option>
                    <el-option label="㎡" value="{value} ㎡"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="旋转角度">
                  <el-input-number size="mini"  v-model="yAxis.nameRotate" controls-position="right"></el-input-number>
                </el-form-item>
              </el-form>
            </div>
          </el-row>
        </el-main>
      </el-container>
    </el-col>
  </el-row>
</template>
<script>
import Bus from '../../utils/bus'
import HotTable from '@handsontable/vue'
import { Chart } from '../charts/Chart'
export default {
  data() {
    return {
      root: 'table',
      title: {
        text: '',
        subtext: ''
      },
      grid: {
        left: '',
        right: '',
        top: '',
        bottom: '',
        containLabel: true
      },
      xAxis: {
        name: '',
        nameRotate: '',
        nameLocation: '',
        axisLabel: {
          formatter: ''
        }
      },
      yAxis: {
        name: '',
        nameRotate: '',
        nameLocation: '',
        axisLabel: {
          formatter: ''
        }
      },
      hotSettings: {
        rowHeaders: true,
        colHeaders: true,
        stretchH: 'all',
        className: 'htCenter',
        fillHandle: true,
        manualColumnFreeze: true,
        contextMenu: {
          items: {
            'row_above': {
              name: '单元格上方插入行'
            },
            'row_below': {
              name: '单元格下方插入行'
            },
            'hsep1': '---------',
            'col_left': {
              name: '单元格左侧插入列'
            },
            'col_right': {
              name: '单元格右侧插入列'
            },
            'hsep2': '---------',
            'remove_row': {
              name: '删除行'
            },
            'remove_col': {
              name: '删除列'
            }
          }
        },
        afterChange(changes, source) {
          if (source !== 'loadData') {
            const data = this.getData()
            Bus.$emit('tableChange', data)
          }
        }
      },
      tableData: [],
      chartData: [],
      chart: null,
      chartType: this.$store.state.bigscreen.chartType
    }
  },
  methods: {
    init() {
      this.chart = new Chart(this.$refs.customeChart)
      this.chart.setChartOption()(this.chartType)
      this.chartData = this.chart.getData()
    },
    chooseChart() {
      this.$root.Bus.$emit('changeChartView', 'ChooseChart')
    }
  },
  watch: {
    title: {
      handler(val) {
        this.chart.setTitle(val)
      },
      deep: true
    },
    grid: {
      handler(val) {
        this.chart.setGrid(val)
      },
      deep: true
    },
    xAxis: {
      handler(val) {
        this.chart.setXAxis(val)
      },
      deep: true
    },
    yAxis: {
      handler(val) {
        this.chart.setYAxis(val)
      },
      deep: true
    }
  },
  components: {
    HotTable
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
    this.init()
    const _this = this
    Bus.$on('tableChange', (content) => {
      if (content) {
        _this.chart.setData(content)
      }
    })
  },
  destroyed() {
    Bus.$off('tableChange')
  }
}
</script>
<style>
@import url('../../../node_modules/handsontable/dist/handsontable.full.min.css');
</style>
<style lang="scss" scoped>
.chart-data{
  background-color: #edf2f6;
  height: 80vh;
}
.option-header{
  font-weight: 700;
  font-size: 12px;
  padding: 5px;
  padding-left: 15px;
  background-color: #364660;
  color: #b4c6d6;
  font-family: Helvetica;
  height: 34px;
  padding-top: 10px;
}
.el-form-item label {
  font-size: 12px;
  color: #b4c6d6;
  font-weight: 400;
}
.content {
  padding: 10px;
}
.panel-left-title {
  font-size: 12px;
  margin: 10px;
}
.panel-left-heading {
  height: 29px;
  background-color: #dae4ec;
}
.panel-left-footer {
  background: #dae4ec;
  height: 50px;
}
.panel-mid-footer{
  background: #ffffff;
  height: 50px;
}
.panel-body {
  background-color: #f1f5f8;
}
.chart-detail{
  height: 80vh;
  background-color: #CAD3DB;
}
.el-main{
  height: 100%;
}
.chart-option {
  font-size: 12px;
  color: #b4c0d6;
  background-color: #dae4ec;
  height: 80vh;
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
.el-form-item{
  padding-left: 20px;
  margin-bottom: 8px;
  color: #b4c0d6;
}
</style>


