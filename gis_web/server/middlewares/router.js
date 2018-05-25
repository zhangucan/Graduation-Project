import Router from 'koa-router'
import convert from 'koa-convert'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import { fetchGridLayout, fetchGridLayoutList, fetchGridItem, saveGridItem, saveGridLayout, createGridLayout } from '../controllers/bigscreen'
import { saveMap, fetchMap, fetchMapList, saveVectorFeatures, fetchVectors } from '../controllers/map'
import { getRSAKey, userLogin, userInfo, requestMiddle, userLogout, userList, saveUser, updateUser } from '../controllers/user'

export const router = app => {
  const router = new Router()
  router.all('/*', requestMiddle)
  router.get('/griditem', fetchGridItem)
  router.post('/griditem', saveGridItem)
  router.get('/gridlayout', fetchGridLayout)
  router.get('/createlayout', createGridLayout)
  router.post('/gridlayout', saveGridLayout)
  router.get('/gridlayoutlist', fetchGridLayoutList)
  router.post('/map/savemap', saveMap)
  router.post('/map/savevectorfeature', saveVectorFeatures)
  router.get('/map', fetchMap)
  router.get('/maps', fetchMapList)
  router.get('/vector', fetchVectors)
  router.post('/vectorfeatures', saveVectorFeatures)
  router.get('/user/rsakey', getRSAKey)
  router.get('/user/list', userList)
  router.post('/user', saveUser)
  router.put('/user', updateUser)
  router.post('/user/login', userLogin)
  router.get('/user/info', userInfo)
  router.post('/user/logout', userLogout)
  app.use(convert(bodyparser()))
  app.use(convert(json()))
  app.use(convert(logger()))
  app.use(router.routes())
     .use(router.allowedMethods())
}
