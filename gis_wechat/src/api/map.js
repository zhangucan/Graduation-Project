import request from '@/utils/request'

export function fetchMap(query) {
  return request({
    url: '/map',
    method: 'get',
    params: query
  })
}

export function fetchMapList(query) {
  return request({
    url: '/maps',
    method: 'get',
    params: query
  })
}

export function saveMap(data) {
  return request({
    url: '/map/savemap',
    method: 'post',
    data
  })
}

export function saveVectorFeature(data) {
  return request({
    url: '/map/savevectorfeature',
    method: 'post',
    data
  })
}
