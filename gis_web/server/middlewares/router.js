import Router from 'koa-router'
import { fetchGridLayout } from '../controllers/bigscreen'

export const router = app => {
  const router = new Router()
  router.get('/bigscreen', fetchGridLayout)
  router.post('/user/login', function(ctx, next) {
    ctx.body = {
      code: 20000,
      data: {
        token: '123456',
        roles: 'admin'
      }
    }
  })
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
  app.use(router.routes())
     .use(router.allowedMethods())
}
