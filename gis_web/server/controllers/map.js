import * as map from '../api/map.js'
import fs from 'fs'
// import Msg from '../utils/Msg'
export async function fetchMap(ctx, next) {
  const { title } = ctx.query
  if (!title) {
    const mapLsit = await map.fetchMap()
    const obj = {
      code: 20000,
      mapLsit: [...mapLsit]
    }
    ctx.body = obj
  } else {
    const mapLsit = await map.fetchMap({ title: title })
    const obj = {
      code: 20000,
      mapLsit: [...mapLsit]
    }
    ctx.body = obj
  }
}

export async function saveMap(ctx, next) {
  map.saveMap(ctx.query)
}

export async function saveVectorFeatures(ctx, next) {
  fs.readFile('./static/test.geojson', 'utf8', function(err, data) {
    if (err) console.log(err)
    map.saveVectorFeatures(data)
  })
  ctx.body = 'hi'
}

export async function fetchVectorFeatures(ctx, next) {
  // const { title, rasterLayers } = ctx.query
}
