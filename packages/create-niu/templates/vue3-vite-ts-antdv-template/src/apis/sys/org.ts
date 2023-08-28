import { defHttp } from '/@/utils/http/axios'

enum Api {
  ORG_TREE = '/sysDept/queryList',

  ORG_LIST = '/sysDept/queryOrgList',

  DEPT = '/sysDept/selectDeptByOrgId',
}

/**
 * @description: 组织+部门（树）
 */
export function orgTree() {
  return defHttp.get({ url: Api.ORG_TREE })
}

/**
 * @description: 组织列表
 */
export function orgList() {
  return defHttp.get({ url: Api.ORG_LIST })
}

/**
 * @description: 根据组织查询部门列表
 */
export function deptList(params: { orgId: string }) {
  return defHttp.get({ url: Api.DEPT, params })
}
