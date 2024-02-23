import { defHttp } from '/@/utils/http/axios'

/* 
  资源管理
*/

// 查询
export const getResource = () =>
  defHttp.get({
    url: '/spResource/getRes',
  })

// 删除
export const deleteById = (id) =>
  defHttp.delete({
    url: '/spResource/delRes',
    data: id,
  })

//新增
export const addResource = (data) =>
  defHttp.post({
    url: '/spResource/addRes',
    data,
  })

// 编辑
export const editResource = (data) =>
  defHttp.post({
    url: '/spResource/updateRes',
    data,
  })
