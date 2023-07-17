import { defHttp } from '/@/utils/http/axios'

enum Api {
  ORG_TREE = '/spOrg/queryTree',
}

/**
 * @description: 获取工作室列表
 */
export function orgTree(data: any) {
  return defHttp.post({ url: Api.ORG_TREE, data })
}
