import { defHttp } from '/@/utils/http/axios'
import { userData, singleUser } from './model/userModel'
import { ErrorMessageMode } from '/#/axios'

enum Api {
  GET_USER_TREE = '/spUser/queryUserTree',
  GET_USER_DATA = '/tBsBaseinfo/queryAllUserInfo',
  ADD_USER = '/tBsBaseinfo/addUserInfo',
  GET_STUDIO_TREE = '/dataChartCT/queryAllOrgTree',
  GET_MAJOR_TREE = '/dataChartCT/queryMajorTree',
  GET_STUDIO_TREE_DATA = '/spOrg/queryAllOrgTree',
  GET_MAJOR_TREE_DATA = '/spOrg/queryMajorTree',
  GET_USER_BY_MAJOR = '/spUser/queryAllUser',
  IMPORT_USERS = '/tBsBaseinfo/batchAddUser',
  IMPORT_HEADERS = '/tBsBaseinfo/uploadHeadFiles',
  RESET_PASSWORD = '/spUser/resetPass',
  EDIT_PASSWORD = '/spUser/updatePwd',
  DEL_USER = '/spUser/delUser',
  PASS_USER = '/tBsBaseinfo/approveUserPass',
  REJECT_USER = '/tBsBaseinfo/approveUserNoPass',
  GET_USER_POINT_CHECK_DATA = '/tBsBaseinfo/queryAllSpotCheckUser',
}

/**
 * @description: 工作室 + 人员 树形结构
 */
export function queryUserTree(
  type?: string, // 01金点子评委 02 专家库
  mode: ErrorMessageMode = 'message',
) {
  return defHttp.get(
    {
      url: Api.GET_USER_TREE + '?type=' + type,
    },
    {
      errorMessageMode: mode,
      isTransformResponse: true,
    },
  )
}

/**
 * @description 查询用户数据
 */
export const getUserData = (data: userData) =>
  defHttp.post(
    {
      url: `${Api.GET_USER_DATA}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
      data,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 查询用户数据(点检专业)
 */
export const getUserPointCheckData = (data: userData) =>
  defHttp.get(
    {
      url: `${Api.GET_USER_POINT_CHECK_DATA}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
      data,
    },
    {
      isTransformResponse: true,
    },
  )

/* 
  新增用户信息
*/
export const addUser = (data: singleUser) =>
  defHttp.post(
    {
      url: Api.ADD_USER,
      data,
    },
    {
      isTransformResponse: true,
    },
  )

/* 
  获取工作室组织树 按单位 (用户管理页面使用)
*/
export const getStudioTreeData = () =>
  defHttp.post(
    {
      url: Api.GET_STUDIO_TREE_DATA,
    },
    {
      isTransformResponse: true,
    },
  )

/* 
  获取工作室组织树 按单位 (非用户管理页面使用)
*/
export const getStudioTree = () =>
  defHttp.post(
    {
      url: Api.GET_STUDIO_TREE,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 获取工作室组织树 按专业(用户管理页面使用)
 */
export const getMajorTreeData = () =>
  defHttp.get(
    {
      url: Api.GET_MAJOR_TREE_DATA,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 获取工作室组织树 按专业(非用户管理页面使用)
 */
export const getMajorTree = () =>
  defHttp.get(
    {
      url: Api.GET_MAJOR_TREE,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 通过专业组查询用户数据
 */
export const getUserByMajor = (data: { majorCode?: string; userTitle?: string }) =>
  defHttp.post(
    {
      url: Api.GET_USER_BY_MAJOR,
      data,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 组织 + 工作室 + 人员 树形结构
 */
export const getOrgUserTree = (data: { majorCode?: string; userTitle?: string; orgId?: string }) =>
  defHttp.post(
    {
      url: '/innovation/client/spUser/queryGPUser',
      data,
    },
    {
      isTransformResponse: true,
      joinPrefix: false,
    },
  )

/**
 * @description 用户导入
 * @param {data} FormData {multipartFile: File} (excel)
 */
export const importUsers = (data: any) =>
  defHttp.post(
    {
      url: Api.IMPORT_USERS,
      data,
      timeout: 10 * 60 * 1000,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 头像导入
 * @param {data} FormData {multipartFile: File} (images)
 */
export const importHeaders = (data: any) =>
  defHttp.post(
    {
      url: Api.IMPORT_HEADERS,
      data,
      timeout: 10 * 60 * 1000,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 重置密码
 */
export const resetPassword = (params: { userId: string }) =>
  defHttp.get(
    {
      url: Api.RESET_PASSWORD,
      params,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 删除用户
 */
export const delUser = (params: { userId: string }) =>
  defHttp.get(
    {
      url: Api.DEL_USER,
      params,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 修改密码
 * @param data {FormData}
 */
export const editPassword = (data: any) =>
  defHttp.post(
    {
      url: Api.EDIT_PASSWORD,
      data,
    },
    {
      isTransformResponse: true,
    },
  )

/**
 * @description 通过审核
 * @param data {id}
 */

export const passData = (data: { id: string | number }) =>
  defHttp.post({
    url: Api.PASS_USER,
    data,
  })

/**
 * @description 不通过审核
 * @param data {id}
 */

export const rejectData = (data: { id: string | number; userAddr: string }) =>
  defHttp.post({
    url: Api.REJECT_USER,
    data,
  })
