import { defHttp } from '/@/utils/http/axios'
/* 
    组织管理
*/
export const getOrgData = () =>
  defHttp.post(
    {
      url: '/spOrg/queryAllOrgTree',
    },
    {
      isTransformResponse: true,
    },
  )
