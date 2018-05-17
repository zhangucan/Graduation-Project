import * as bigscreen from '../api/bigscreen.js'
// const testLayout = {
//   _id: '5aefe230b5ec0791697972e3',
//   title: '白龟山湿地公园',
//   gridItems: [
//       { 'x': 0, 'y': 0, 'w': 2, 'h': 3, 'i': '0', title: 'test', gridType: 'chart', component: { id: 'test' }},
//       { 'x': 2, 'y': 0, 'w': 8, 'h': 12, 'i': '1', title: 'test', gridType: 'map', component: { id: 'test' }},
//       { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '2', title: 'test', gridType: 'chart', component: { id: 'test' }},
//       { 'x': 0, 'y': 2, 'w': 2, 'h': 3, 'i': '3', title: 'test', gridType: 'chart', component: { id: 'test' }},
//       { 'x': 10, 'y': 2, 'w': 2, 'h': 3, 'i': '4', title: 'test', gridType: 'chart', component: { id: 'test' }},
//       { 'x': 0, 'y': 4, 'w': 2, 'h': 3, 'i': '5', title: 'test', gridType: 'chart', component: { id: 'test' }},
//       { 'x': 10, 'y': 4, 'w': 2, 'h': 3, 'i': '6', title: 'test', gridType: 'chart', component: { id: 'test' }},
//       { 'x': 0, 'y': 6, 'w': 2, 'h': 3, 'i': '7', title: 'test', gridType: 'chart', component: { id: 'test' }},
//       { 'x': 10, 'y': 6, 'w': 2, 'h': 3, 'i': '8', title: 'test', gridType: 'chart', component: { id: 'test' }}
//   ]
// }
export async function fetchGridLayout(ctx, next) {
  const query = ctx.query
  const gridLayout = await bigscreen.fetchGridLayout(query)
  const gridItems = await bigscreen.fetchGridItems({ gridLayoutId: gridLayout._id })
  const obj = {
    code: 20000,
    gridItems: [...gridItems],
    gridLayout: gridLayout
  }
  ctx.body = obj
}
export async function fetchGridLayoutList(ctx, next) {
  const fetchGridLayoutList = await bigscreen.fetchGridLayoutList()
  const obj = {
    code: 20000,
    gridLayoutList: [...fetchGridLayoutList]
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

export async function saveGridItem(ctx, next) {
  await bigscreen.saveGridItem(ctx.request.body)
  const obj = {
    code: 20000
  }
  ctx.body = obj
}

export async function saveGridLayout(ctx, next) {
  const data = ctx.request.body
  const gridLayoutId = await bigscreen.saveGridLayout(data.gridLayout)
  data.gridItems.forEach(async item => {
    item.gridLayoutId = gridLayoutId
    await bigscreen.saveGridItem(item)
  })
  const obj = {
    code: 20000
  }
  ctx.body = obj
}
