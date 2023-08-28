import { defHttp } from '/@/utils/http/axios'

enum Api {
  ADD = '/sysDept/saveDeptInfo',

  UPDATE = '/sysDept/updateDeptById',

  DELETE = '/sysDept/deleteDeptById',

  TEMPLATE = '/sysDept/download/deptTemplate',

  IMPORT = '/sysDept/importDeptList',
}

/**
 * @description: 新增部门
 */
export function addDept(data: any) {
  return defHttp.post({ url: Api.ADD, data })
}

/**
 * @description: 修改
 */
export function update(data: any) {
  return defHttp.post({ url: Api.UPDATE, data })
}

/**
 * @description: 删除
 */
export function delDept(params: { deptId: string }) {
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
export function deptTemplate() {
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
