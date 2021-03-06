import request from '@/utils/request'

export function fetchLayout(id) {
  return request({
    url: `/gridlayout/gridlayouts/${id}`,
    method: 'get'
  })
}

export function fetchLayoutList(query) {
  return request({
    url: '/gridlayoutlist',
    method: 'get',
    params: query
  })
}

export function fetchGridItem(query) {
  return request({
    url: '/griditem',
    method: 'get',
    params: query
  })
}

export function fetchVectors(query) {
  return request({
    url: '/vector',
    method: 'get',
    params: query
  })
}

export function saveGridItem(data) {
  return request({
    url: '/griditem',
    method: 'post',
    data
  })
}

export function saveGridLayout(data) {
  return request({
    url: '/gridlayout',
    method: 'post',
    data
  })
}
