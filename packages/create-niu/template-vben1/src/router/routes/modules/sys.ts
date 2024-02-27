import type { AppRouteModule } from '/@/router/types'

import { NORMAL_LAYOUT } from '/@/router/constant'

// 系统设置
const settingManage: AppRouteModule = {
  path: '/setting',
  name: 'SettingPermission',
  component: NORMAL_LAYOUT,
  redirect: '/setting/rolePermission',
  meta: {
    icon: '',
    title: '系统管理',
    orderNo: 15,
    hidenInNav: true, // 在导航栏中不显示，侧边栏显示子项
    roles: [],
  },
  children: [
    {
      path: 'rolePermission',
      name: 'RolePermission',
      component: () => import('/@/views/setting/rolePermission/index.vue'),
      meta: {
        title: '角色权限管理',
        icon: 'roleManage',
        hideMenu: false,
      },
    },
    {
      path: 'administratorManage',
      name: 'AdministratorManage',
      component: () => import('/@/views/setting/administratorManage/index.vue'),
      meta: {
        title: '管理员账号管理',
        icon: 'administratorManage',
      },
    },
    {
      path: 'orgManage',
      name: 'OrgManage',
      component: () => import('/@/views/setting/orgManage/index.vue'),
      meta: {
        title: '组织管理',
        icon: 'orgManage',
        hideMenu: false,
      },
    },
    {
      path: 'resourceManage',
      name: 'ResourceManage',
      component: () => import('/@/views/setting/resourceManage/index.vue'),
      meta: {
        title: '资源管理',
        icon: 'roleManage',
        hideMenu: false,
      },
    },
  ],
}

export default settingManage
