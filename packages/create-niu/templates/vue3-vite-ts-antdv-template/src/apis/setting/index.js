import { defHttp } from '/@/utils/http/axios'
/* 
    系统管理公用接口
*/
export const getOrgData = () =>
  defHttp.post(
    {
      url: '/spOrg/queryTree',
      data: {
        orgType: 'DW',
      },
    },
    {
      isTransformResponse: true,
    },
  )
