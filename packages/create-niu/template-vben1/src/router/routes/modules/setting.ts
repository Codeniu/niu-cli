import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
// import { RoleEnum } from '/@/enums/roleEnum'

// 系统设置
const settingManage: AppRouteModule = {
  path: '/setting',
  name: 'SettingPermission',
  component: LAYOUT,
  redirect: '/setting/org',
  meta: {
    icon: 'nav-role',
    title: '设置',
    orderNo: 15,
    // hidenInNav: true, // 在导航栏中不显示，侧边栏显示子项
    // roles: [RoleEnum.ZGH],
  },
  children: [
    {
      path: 'org',
      name: 'OrgManage',
      component: () => import('/@/views/setting/org/index.vue'),
      meta: {
        title: '组织管理',
        icon: 'nav-org',
        hideMenu: false,
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('/@/views/setting/role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'nav-role',
        hideMenu: false,
      },
    },
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('/@/views/setting/menu/index.vue'),
      meta: {
        title: '菜单管理',
        icon: 'nav-role',
        hideMenu: false,
      },
    },
    {
      path: 'admin',
      name: 'AdministratorManage',
      component: () => import('/@/views/setting/admin/index.vue'),
      meta: {
        title: '账号管理',
        icon: 'studio-integral',
      },
    },
  ],
}

export default settingManage
