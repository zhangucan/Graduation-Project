import Router from 'koa-router'
import convert from 'koa-convert'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import { fetchGridLayout } from '../controllers/bigscreen'
import { saveMap, fetchMap } from '../controllers/map'
import { saveVectorFeatures } from '../controllers/map'

export const router = app => {
  const router = new Router()
  router.get('/bigscreen', fetchGridLayout)
  router.post('/map/savemap', saveMap)
  router.post('/map/savevectorfeature', saveVectorFeatures)
  router.get('/maps', fetchMap)
  router.post('/vectorfeatures', saveVectorFeatures)
  router.post('/user/login', function(ctx, next) {
    ctx.body = {
      code: 20000,
      data: {
        token: '123456',
        roles: 'admin'
      }
    }
  })
  router.get('/test', saveVectorFeatures)
  router.get('/user/info', function(ctx, next) {
    ctx.body = {
      code: 20000,
      data: {
        token: '123456',
        roles: 'admin'
      }
    }
  })
  router.get('/user/logout', fetchGridLayout)
  app.use(convert(bodyparser()))
  app.use(convert(json()))
  app.use(convert(logger()))
  app.use(router.routes())
     .use(router.allowedMethods())
}
