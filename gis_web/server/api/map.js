import mongoose from 'mongoose'
const VectorFeatures = mongoose.model('VectorFeatures')
const Map = mongoose.model('Map')
export async function saveVectorFeatures(data) {
  const a = JSON.parse(data)
  var type = a.type.toLowerCase()
  var obj = {
    title: 'A test object'
  }
  obj[type] = a
  console.log(obj)
  const vectorFeatures = new VectorFeatures(obj)
  return new Promise((resolve, reject) => {
    vectorFeatures.save((err, obj) => {
      console.log(obj)
      if (err) return reject(err)
      return resolve(obj)
    })
  })
}
export async function fetchVectorFeatures(query) {
  return new Promise((resolve, reject) => {
    VectorFeatures.find(query, (error, data) => {
      if (error) return reject(error)
      if (data) {
        return resolve(data)
      } else {
        return reject()
      }
    })
  })
}

export async function fetchMap(query) {
  return new Promise((resolve, reject) => {
    Map.find(query, (error, data) => {
      if (error) return reject(error)
      if (data) {
        return resolve(data)
      } else {
        return reject()
      }
    })
  })
}

export async function saveMap(data) {
  let map = null
  if (data.id) {
    map = await fetchMap({ _id: data.id })
  }
  if (map) {
    map.title = data.title
    map.rasterLayers = data.rasterLayers
  } else {
    map = new Map({
      title: data.title,
      rasterLayers: data.rasterLayers
    })
  }
  return new Promise((resolve, reject) => {
    map.save((err, obj) => {
      console.log(obj)
      if (err) return reject(err)
      return resolve(obj._id)
    })
  })
}
