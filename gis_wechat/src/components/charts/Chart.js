import echarts from 'echarts'
import R from 'ramda'
import walden from '../charts/walden'
// __dirname 当前路径
export class Chart {
  constructor(el) {
    echarts.registerTheme('walden', walden)
    this.chart = echarts.init(el, 'walden')
  }
  setChartOption() {
    return R.compose(
      i => this.chart.setOption(i.option),
      i => require(`./${i.type}/${i.name}`)
    )
  }
  clear() {
    this.chart.clear()
  }
  getData() {
    const option = this.chart.getOption()
    const data = option.series.map(item => {
      return item.data
    })
    let category = []
    if (option.xAxis[0].type === 'category') {
      category = option.xAxis[0].data
    } else {
      category = option.yAxis[0].data
    }
    const legend = option.legend[0].data
    data.unshift(category)
    const tempArr = data[0].map((col, i) => {
      return data.map((row) => {
        return row[i]
      })
    })
    legend.unshift('')
    tempArr.unshift(legend)
    return tempArr
  }
  setTitle(title) {
    const option = this.chart.getOption()
    option.title = title
    this.chart.setOption(option)
  }
  setXAxis(xAxis) {
    const option = this.chart.getOption()
    option.xAxis[0]['name'] = xAxis.name
    option.xAxis[0]['nameRotate'] = xAxis.nameRotate
    option.xAxis[0]['nameLocation'] = xAxis.nameLocation
    option.xAxis[0]['axisLabel'] = xAxis.axisLabel
    this.chart.setOption(option)
  }
  setYAxis(yAxis) {
    const option = this.chart.getOption()
    option.yAxis[0]['name'] = yAxis.name
    option.yAxis[0]['nameRotate'] = yAxis.nameRotate
    option.yAxis[0]['nameLocation'] = yAxis.nameLocation
    option.yAxis[0]['axisLabel'] = yAxis.axisLabel
    this.chart.setOption(option)
  }
  setGrid(grid) {
    const option = this.chart.getOption()
    option.grid = grid
    this.chart.setOption(option)
  }
  setData(data) {
    const option = this.chart.getOption()
    const category = data.shift()
    category.shift()
    option.legend[0].data = category
    const tempArr = data[0].map((col, i) => {
      return data.map((row) => {
        return row[i]
      })
    })

    if (option.xAxis[0].type === 'category') {
      option.xAxis[0].data = tempArr.shift()
    } else {
      option.yAxis[0].data = tempArr.shift()
    }
    tempArr.forEach((item, index) => {
      if (!option.series[index]) {
        option.series[index] = option.series[0]
      }
      option.series[index].data = item.map(item2 => {
        return Number(item2)
      })
      option.series[index].name = category[index]
    })
    this.chart.setOption(option)
  }
}
