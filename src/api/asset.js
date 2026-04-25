import request from './request'

export function confirmCow(data) {
  return request({
    url: '/api/cow/confirm',
    method: 'post',
    data
  })
}

export function verifyCow(id) {
  return request({
    url: `/api/cow/verify/${id}`,
    method: 'get'
  })
}

export function getCowList() {
  return request({
    url: '/api/cow/list',
    method: 'get'
  })
}

export function deleteCow(id) {
  return request({
    url: `/api/cow/delete/${id}`,
    method: 'delete'
  })
}

export function updateCow(data) {
  return request({
    url: '/api/cow/update',
    method: 'put',
    data
  })
}