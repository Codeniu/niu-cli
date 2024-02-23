import { defHttp } from '/@/utils/http/axios'

enum Api {
  ALL = '/sysMenu/queryMenuList',

  ADD = '/sysMenu/saveMenuInfo',

  DELETE = '/sysMenu/delById',

  UPDATE = '/sysMenu/updateMenuInfo',
}

/**
 * @description: 查询全部菜单
 */
export const getAllMenus = (params: any) => {
  return defHttp.get({ url: Api.ALL, params })
}

/**
 * @description: 添加
 */
export function add(data: any) {
  return defHttp.post({ url: Api.ADD, data })
}

/**
 * @description: 删除
 */
export type deleteApiParam = {
  menuId?: string
}
export function deleteApi(params: deleteApiParam) {
  return defHttp.get({ url: Api.DELETE, params })
}

/**
 * @description: 修改
 */
export function update(data: any) {
  return defHttp.post({ url: Api.UPDATE, data })
}
