import { defHttp } from '/@/utils/http/axios'

export interface DynamicType {
  id: string | number
  time: string
  company: string
  socer: string
  errorNum: string | number
}

/* 
  工作室积分列表数据
*/
export const getStudioData = (data: any) =>
  defHttp.post({
    url: '/integral/tBsIntegralDetail/queryStudioIntegral',
    data,
  })

/* 
  个人积分列表数据
*/
export const getPersonnelData = (data: any) =>
  defHttp.post({
    url: '/integral/tBsIntegralDetail/queryPersonIntegral',
    data,
  })

/* 
  实习成员积分列表数据
*/
export const getTrainMemberData = (data: any) =>
  defHttp.post({
    url: '/integral/tBsIntegralDetail/queryTraineePersonIntegral',
    data,
  })

// 获取上传相关数据
export const getData = (params: { orgId?: string; majorCode?: string }) =>
  defHttp.get({
    url: `/dataChartCT/getAllChartInfo`,
    params,
  })

// 获取平台活跃度分析折线
export const getLineData = (params: {
  type: string
  startTime: string
  endTime: string
  orgId?: string
  majorCode?: string
}) =>
  defHttp.get({
    url: `/dataChartCT/getPlatformAvtivity`,
    params,
  })

// 各模块积分占比情况分析
export const getPieData = (params: { orgId?: string; majorCode?: string }) =>
  defHttp.get({
    url: `/integralChartCT/getIntegralPercent`,
    params,
  })

// 获取轮播图数据
export const getLoopData = (params: { orgId?: string; majorCode?: string }) =>
  defHttp.get({
    url: `/dataChartCT/getAllCount`,
    params,
  })
