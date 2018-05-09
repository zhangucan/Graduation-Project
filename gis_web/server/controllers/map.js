import * as map from '../api/map.js'
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
  console.log(ctx.request.body)
  const mapId = await map.saveMap(ctx.request.body)
  const obj = {
    code: 20000,
    mapId: mapId
  }
  ctx.body = obj
}

export async function saveVectorFeatures(ctx, next) {
  await map.saveVectorFeatures(ctx.request.body)
  const obj = {
    code: 20000
  }
  ctx.body = obj
}

export async function fetchVectorFeatures(ctx, next) {
  // const { title, rasterLayers } = ctx.query
}
