import mongoose from 'mongoose'
const GridItem = mongoose.model('GridItem')
const GridLayout = mongoose.model('GridLayout')

export async function fetchGridLayout(query) {
  return new Promise((resolve, reject) => {
    GridLayout.find(query, (error, data) => {
      if (error) return reject(error)
      if (data) {
        return resolve(data)
      } else {
        return reject()
      }
    })
  })
}
export async function saveGridLayout(data) {
  let gridLayout = null
  if (data.id) {
    gridLayout = await fetchGridLayout({ _id: data.id })
  }
  if (gridLayout) {
    gridLayout.title = data.title
  } else {
    gridLayout = new GridLayout({
      title: data.title
    })
  }
  return new Promise((resolve, reject) => {
    gridLayout.save((err, obj) => {
      console.log(obj)
      if (err) return reject(err)
      return resolve(obj._id)
    })
  })
}
export async function fetchGridItem(query) {
  return new Promise((resolve, reject) => {
    GridItem.find(query, (error, data) => {
      if (error) return reject(error)
      if (data) {
        return resolve(data)
      } else {
        return reject()
      }
    })
  })
}
export async function saveGridItem(data, gridLayoutId) {
  let gridItem = null
  if (data.id) {
    gridItem = await fetchGridItem({ _id: data.id })
  }
  if (gridItem) {
    gridItem.i = data.i
    gridItem.x = data.x
    gridItem.y = data.y
    gridItem.w = data.w
    gridItem.h = data.h
    gridItem.title = data.title
    gridItem.gridLayoutId = gridLayoutId
    gridItem.component = data.component
  } else {
    gridItem = new GridItem({
      i: data.i,
      x: data.x,
      y: data.y,
      w: data.w,
      h: data.h,
      title: data.title,
      component: data.component,
      gridLayoutId: gridLayoutId
    })
  }
  console.log(gridLayoutId)
  return new Promise((resolve, reject) => {
    gridItem.save((err, obj) => {
      console.log(gridItem)
      if (err) return reject(err)
      return resolve(obj._id)
    })
  })
}