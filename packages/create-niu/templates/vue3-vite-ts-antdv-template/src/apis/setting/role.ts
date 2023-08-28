import { RoleItem } from './model/roleModel'
import { defHttp } from '/@/utils/http/axios'

enum Api {
  GetRoleList = '/sysRole/queryRoleList',

  AddRole = '/sysRole/saveRoleInfo',

  ROLE_MENUS = '/sysMenu/queryMenuByRoleList',

  SAVE_ROLE_MENU = '/sysRoleMenu/saveRoleMenu',
}

/**
 * @description: 查询
 */
export const getRoleList = () => {
  return defHttp.get<RoleItem[]>({ url: Api.GetRoleList })
}

/**
 * @description: 新增角色
 */
export const addRole = (data: any) => {
  return defHttp.post({ url: Api.AddRole, data })
}

/**
 * @description: 编辑角色的菜单信息
 */
export const saveRoleMenu = (data: any) => {
  return defHttp.post({ url: Api.SAVE_ROLE_MENU, data })
}

/**
 * @description: 根据角色查询菜单列表
 */
export const queryMenuByRoleList = (params: { roleId: string }) => {
  return defHttp.get({ url: Api.ROLE_MENUS, params })
}
