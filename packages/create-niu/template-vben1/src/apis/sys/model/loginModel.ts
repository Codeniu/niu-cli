/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
}

export interface wechatLoginParam {
  code: string
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户id
  id: string | number
  // 用户名
  username: string
  // 真实名字
  userTitle: string
  // 头像
  photo: string
  // 介绍
  desc?: string
  // 头衔
  titles?: string
  roleCode: []
}
