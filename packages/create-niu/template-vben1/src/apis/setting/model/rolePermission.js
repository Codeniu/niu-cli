import { defHttp } from '/@/utils/http/axios'
/* 
    角色权限管理
*/

//查询所有角色
export const getRoles = () =>
  defHttp.get({
    url: '/spRole/getRoles',
    data: {
      pageNum: 1,
      pageSize: 20,
      roleName: '',
    },
  })

//新增角色
export const addRole = (data) =>
  defHttp.post({
    url: '/spRole/addRole',
    data,
  })

//修改角色
export const updateRole = (data) =>
  defHttp.post({
    url: '/spRole/updateRole',
    data,
  })

//删除角色
export const deleteRole = (id) =>
  defHttp.delete({
    url: '/spRole/delRole',
    data: id,
  })
