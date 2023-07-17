import { defHttp } from '/@/utils/http/axios'
/* 
    管理员账号管理
*/

// 获取单位管理员
export const getOrgAdminData = () =>
  defHttp.get(
    {
      url: '/spUserRoleMap/queryAllCorpAdmin',
    },
    {
      isTransformResponse: true,
    },
  )

// 获取工作室管理员和车间主任
export const getStudioDirectorData = (params) =>
  defHttp.get(
    {
      url: '/spUserRoleMap/queryAllOrgAdmin',
      params,
    },
    {
      isTransformResponse: true,
      joinParamsToUrl: true,
    },
  )

//根据orgId查询所有用户信息
export const getUserByOrgId = (orgId) =>
  defHttp.get(
    {
      url: '/spUserRoleMap/queryUserByOrgId?orgId=' + orgId,
    },
    {
      isTransformResponse: true,
    },
  )

// 新增/编辑单位管理员
export const saveOrgAdmin = (data) =>
  defHttp.post(
    {
      url: '/spUserRoleMap/addDWAdmin',
      data,
    },
    {
      isTransformResponse: true,
    },
  )

// 更换/新增工作室管理员
export const editStudioAdmin = (data) =>
  defHttp.post(
    {
      url: '/spUserRoleMap/addCorpAdmin',
      data,
    },
    {
      isTransformResponse: true,
    },
  )
// 更换/新增车间主任
export const editStudioDirector = (data) =>
  defHttp.post(
    {
      url: '/spUserRoleMap/addDirectorAdmin',
      data,
    },
    {
      isTransformResponse: true,
    },
  )
