import type { AppRouteModule } from '/@/router/types'

import { NORMAL_LAYOUT } from '/@/router/constant'

// token管理
const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: NORMAL_LAYOUT,
  redirect: '/user/user-manage',
  meta: {
    icon: 'user-manage',
    title: '用户管理',
    orderNo: 4,
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
