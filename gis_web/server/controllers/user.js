import NodeRSA from 'node-rsa'
import * as userApi from '../api/user.js'
import config from '../config/index'
import { redisStore } from '../utils/store'
const private_key = new NodeRSA(config.private_key)
private_key.setOptions({ encryptionScheme: 'pkcs1' })
export async function userLogin(ctx, next) {
  const msg = {
    data: {
      token: ''
    },
    message: '',
    code: ''
  }
  const data = ctx.request.body
  var decrypted = private_key.decrypt(data.password, 'utf8')
  const user = {
    name: data.username,
    password: decrypted
  }

  try {
    const userInfo = await userApi.useLogin(user)
    ctx.session.user = userInfo
    msg.data.token = ctx.cookies.get('sessionId')
    msg.code = 20000
  } catch (error) {
    msg.message = error
    msg.code = 50008
  }
  ctx.body = msg
}
export async function requestMiddle(ctx, next) {
  const re = /^\/user\/(login|logout|rsakey)$/gi
  if (re.test(ctx.url)) {
    await next()
  } else {
    if (ctx.cookies.get('sessionId')) {
      const sessionId = ctx.cookies.get('sessionId')
      const userInfo = await redisStore.get(sessionId, ctx)
      if (userInfo) {
        redisStore.set(userInfo, { sid: sessionId }, ctx)
        await next()
      } else {
        ctx.body = {
          code: 50008
        }
      }
    } else {
      ctx.body = {
        code: 50000
      }
    }
  }
}
export async function userInfo(ctx, next) {
  const useInfo = await redisStore.get(ctx.cookies.get('sessionId'), ctx)
  ctx.body = {
    code: 20000,
    data: {
      name: useInfo.user.name,
      roles: useInfo.user.roles,
      gridLayouts: useInfo.user.gridLayouts
    }
  }
}
export async function userLogout(ctx, next) {
  const sessionId = ctx.cookies.get('sessionId')
  await redisStore.destroy(sessionId, ctx)
  ctx.body = {
    code: 20000
  }
}
export function getRSAKey(ctx, next) {
  ctx.body = {
    key: config.public_key,
    code: 20000
  }
}
