import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(_id) {
  return request({
    url: `/user/info`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getRSAkey() {
  return request({
    url: '/user/pubkey',
    method: 'get'
  })
}

export function userDetail(_id) {
  return request({
    url: `/user/detail/${_id}`,
    method: 'get'
  })
}
