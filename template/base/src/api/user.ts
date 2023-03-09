import request from '@/utils/request'

/** 账户基本信息 */
export function login(data: object) {
  return request({
    url: '/account/basicAccountInfo',
    data
  })
}
