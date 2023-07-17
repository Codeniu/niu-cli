import { defHttp } from '/@/utils/http/axios'

import { GetUserInfoModel, LoginParams, wechatLoginParam } from './model/loginModel'
import { ErrorMessageMode } from '/#/axios'
import { objectToFormData } from '/@/utils/http/axios/helper'

enum Api {
  GET_TOKEN = '/spUser/getBearToken',
  Login = '/innovation/login/userLogin',
  Logout = '/innovation/login/userLogout',
  GetUserInfo = '/spUser/queryCurrentUser',
  GetPermCode = '/getPermCode',
  WechatLogin = '/weChat/getUserId', // 微信扫码登录 开发及测试环境
  prodWechatLogin = '/ZYweChat/getUserId', // 微信扫码登录 生产环境
}

/**
 * @description: 获取 Token
 */
export function getToken(params: { userName: string }) {
  return defHttp.get({
    url: Api.GET_TOKEN,
    params,
  })
}

/**
 * @description: user login api
 * formData 请求
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Login,
      data: objectToFormData(params),
    },
    {
      errorMessageMode: mode,
      joinPrefix: false,
      isTransformResponse: true,
    },
  )
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo },
    { errorMessageMode: 'message', isTransformResponse: true },
  )
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode })
}

/**
 * @description 登出系统
 */
export function doLogout() {
  return defHttp.get({ url: Api.Logout }, { joinPrefix: false })
}

/**
 * @description 微信扫码登录
 */
export function wechatLogin(params: wechatLoginParam, mode: ErrorMessageMode = 'modal') {
  const { MODE } = import.meta.env

  return defHttp.get(
    { url: MODE === 'production' ? Api.prodWechatLogin : Api.WechatLogin, params },
    {
      errorMessageMode: mode,
    },
  )
}
