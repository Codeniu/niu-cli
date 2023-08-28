import { defHttp } from '/@/utils/http/axios'

enum Api {
  ADD = '/sysOrg/saveOrgInfo',

  UPDATE = '/sysOrg/updateOrgInfo',

  DELETE = '/sysOrg/deleteOrgById',
}

/**
 * @description: 新增单位
 */
export function addOrg(data: any) {
  return defHttp.post({ url: Api.ADD, data })
}

/**
 * @description: 修改单位
 */
export function update(data: any) {
  return defHttp.post({ url: Api.UPDATE, data })
}

/**
 * @description: 删除单位
 */
export function delOrg(data: any) {
  return defHttp.post({ url: Api.DELETE, data })
}
