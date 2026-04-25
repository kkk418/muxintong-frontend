import request from './request'

export function evaluateCow(data) {
  return request({
    url: '/api/cow/evaluate',
    method: 'post',
    data
  })
}