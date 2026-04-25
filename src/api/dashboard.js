import request from './request'

export function getDashboardData() {
  return request({
    url: 'https://abc.cpolar.cn',
    method: 'get'
  })
}