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
  const query = ctx.query
  const gridLayout = await bigscreen.fetchGridLayout(query)
  const gridItems = await bigscreen.fetchGridItems({ gridLayoutId: gridLayout._id })
  const obj = {
    code: 20000,
    gridItems: [...gridItems]
  }
  ctx.body = obj
}
export async function fetchGridLayoutList(ctx, next) {
  const fetchGridLayoutList = await bigscreen.fetchGridLayoutList()
  const obj = {
    code: 20000,
    gridItems: [...fetchGridLayoutList]
  }
  ctx.body = obj
}

export async function fetchGridItem(ctx, next) {
  const fetchGridItem = await bigscreen.fetchGridItem(ctx.query)
  const obj = {
    code: 20000,
    gridItem: fetchGridItem
  }
  ctx.body = obj
}

