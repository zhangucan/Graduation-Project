import * as bigscreen from '../api/bigscreen.js'
// const testLayout = [
//   { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0', title: 'test', component: 'test' },
//   { 'x': 2, 'y': 0, 'w': 8, 'h': 10, 'i': '1', title: 'test', component: 'test' },
//   { 'x': 10, 'y': 0, 'w': 2, 'h': 2, 'i': '2', title: 'test', component: 'test' },
//   { 'x': 0, 'y': 2, 'w': 2, 'h': 2, 'i': '3', title: 'test', component: 'test' },
//   { 'x': 10, 'y': 2, 'w': 2, 'h': 2, 'i': '4', title: 'test', component: 'test' },
//   { 'x': 0, 'y': 4, 'w': 2, 'h': 2, 'i': '5', title: 'test', component: 'test' },
//   { 'x': 10, 'y': 4, 'w': 2, 'h': 2, 'i': '6', title: 'test', component: 'test' },
//   { 'x': 0, 'y': 6, 'w': 2, 'h': 2, 'i': '7', title: 'test', component: 'test' },
//   { 'x': 10, 'y': 6, 'w': 2, 'h': 2, 'i': '8', title: 'test', component: 'test' }
// ]
export async function fetchGridLayout(ctx, next) {
  // var obj = {
  //   title: '白龟山湿地公园'
  // }
  // var a = await bigscreen.saveGridLayout(obj)
  // console.log(a)
  // testLayout.forEach(async item => {
  //   await bigscreen.saveGridItem(item, a)
  // })
  const { title } = ctx.query
  const gridLayout = await bigscreen.fetchGridLayout({ title: title })
  const gridItems = await bigscreen.fetchGridItem({ gridLayoutId: gridLayout[0]._id })
  const obj = {
    title: gridLayout[0].title,
    gridItems: [...gridItems]
  }
  ctx.body = obj
}
