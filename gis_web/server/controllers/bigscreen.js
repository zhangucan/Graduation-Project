import * as bigscreen from '../api/bigscreen.js'
// const testLayout = [
//   { 'x': 0, 'y': 0, 'w': 2, 'h': 3, 'i': '0', title: 'test', gridType: 'chart', component: 'test' },
//   { 'x': 2, 'y': 0, 'w': 8, 'h': 12, 'i': '1', title: 'test', gridType: 'map', component: 'test' },
//   { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '2', title: 'test', gridType: 'chart', component: 'test' },
//   { 'x': 0, 'y': 2, 'w': 2, 'h': 3, 'i': '3', title: 'test', gridType: 'chart', component: 'test' },
//   { 'x': 10, 'y': 2, 'w': 2, 'h': 3, 'i': '4', title: 'test', gridType: 'chart', component: 'test' },
//   { 'x': 0, 'y': 4, 'w': 2, 'h': 3, 'i': '5', title: 'test', gridType: 'chart', component: 'test' },
//   { 'x': 10, 'y': 4, 'w': 2, 'h': 3, 'i': '6', title: 'test', gridType: 'chart', component: 'test' },
//   { 'x': 0, 'y': 6, 'w': 2, 'h': 3, 'i': '7', title: 'test', gridType: 'chart', component: 'test' },
//   { 'x': 10, 'y': 6, 'w': 2, 'h': 3, 'i': '8', title: 'test', gridType: 'chart', component: 'test' }
// ]

export async function fetchGridLayout(ctx, next) {
  // var obj = {
  //   title: '白龟山湿地公园'
  // }
  // var a = await bigscreen.saveGridLayout(obj)
  // testLayout.forEach(async item => {
  //   console.log(item)
  //   await bigscreen.saveGridItem(item, a)
  // })
  const { title } = ctx.query
  const gridLayout = await bigscreen.fetchGridLayout({ title: title })
  const gridItems = await bigscreen.fetchGridItem({ gridLayoutId: gridLayout[0]._id })
  const obj = {
    code: 20000,
    title: gridLayout[0].title,
    gridItems: [...gridItems]
  }
  ctx.body = obj
}
