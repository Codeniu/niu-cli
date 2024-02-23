import { defHttp } from '/@/utils/http/axios'
import { CodeTypeEnum } from '/@/enums/dictEnum'

enum Api {
  DICTIONARY_LIST = '/tMdmCode/queryByCodeType',
}

/**
 * @description: 获取字典列表
 */
export function dictionaryList(params: { codeType: CodeTypeEnum }) {
  return defHttp.get({ url: Api.DICTIONARY_LIST, params })
}
