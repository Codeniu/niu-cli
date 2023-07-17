import type { AppRouteModule } from '/@/router/types'

import { USER_LAYOUT } from '/@/router/constant'
// import { RoleEnum } from '/@/enums/roleEnum'

// token管理
const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: USER_LAYOUT,
  redirect: '/user/user-manage',
  meta: {
    icon: 'user-manage',
    title: '用户管理',
    orderNo: 15,
    // roles: [RoleEnum.ZGH, RoleEnum.ZYZ],
  },
  children: [
    {
      path: 'user-manage',
      name: 'UserManage',
      component: () => import('/@/views/user/index.vue'),
      meta: {
        title: '用户管理',
      },
    },
  ],
}

export default user
