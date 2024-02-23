import { defHttp } from '/@/utils/http/axios'

enum Api {
  LIST = '/sysUser/queryBaseList',

  DETIAL = '/sysUser/querySysUserOne',

  RESET_PASSWORD = '/sysUser/resetPassword',

  DELETE = '/sysUser/removeUserById',

  TEMPLATE = '/sysUser/down/userTemplate',

  IMPORT = '/sysUser/importUser',

  UPDATE = '/sysUser/updateUserInfo',

  ADD = '/sysUser/saveUserInfo',
}

/**
 * @description: 查询账号列表
 */
export const getAllUser = (params: any) => {
  return defHttp.get({ url: Api.LIST, params })
}

/**
 * @description: 根据用户id查询用户信息
 */
export const getUserById = (params: { userId: string }) => {
  return defHttp.get({ url: Api.DETIAL, params })
}

/**
 * @description: 重置密码
 */
export const resetPassword = (params: { userId: string }) => {
  return defHttp.get({ url: Api.RESET_PASSWORD, params })
}

/**
 * @description: 修改
 * @param deptId 部门
 * @param idphoneNum 手机号
 * @param nickName 昵称
 * @param roleList 权限列表
 */
export function update(data: any) {
  return defHttp.post({ url: Api.UPDATE, data })
}

/**
 * @description: 新增
 */
export function add(data: any) {
  return defHttp.post({ url: Api.ADD, data })
}

/**
 * @description: 删除
 */
export function delApi(params: { userId: string }) {
  return defHttp.get({ url: Api.DELETE, params })
}

/**
 * @description: 导入
 */
export function deptImport(data: any) {
  return defHttp.post({ url: Api.IMPORT, data })
}

/**
 * @description: 下载模板
 */
export function downloadTemplate() {
  return defHttp.get(
    {
      url: Api.TEMPLATE,
      responseType: 'blob',
    },
    {
      joinParamsToUrl: true,
      isTransformResponse: false,
    },
  )
}
