import { paginationParams } from '../model/baseModel'
import { defHttp } from '/@/utils/http/axios'

enum Api {
  TASK = '/tBsAgency/searchAgency',
  HISTORY_TASK = '/tBsAgency/searchDoneAgency',
  TASK_DONE = '/tBsAgency/readById',
}

/**
 * @description 根据当前登录用户获取代办列表
 */
export function getTask(params: paginationParams) {
  return defHttp.get({ url: Api.TASK, params }, { isTransformResponse: true })
}

/**
 * @description 已处理代办列表
 */
export function getHistoryTask(params: paginationParams) {
  return defHttp.get({ url: Api.HISTORY_TASK, params }, { isTransformResponse: true })
}

/**
 * @description 标为已读
 */
export function setTaskDone(params: paginationParams) {
  return defHttp.get({ url: Api.TASK_DONE, params }, { isTransformResponse: true })
}
