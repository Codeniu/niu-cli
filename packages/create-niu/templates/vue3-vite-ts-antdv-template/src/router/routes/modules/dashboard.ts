import type { AppRouteModule } from '/@/router/types'

import { NORMAL_LAYOUT } from '/@/router/constant'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: NORMAL_LAYOUT,
  redirect: '/dashboard/workbench',
  meta: {
    orderNo: 1,
    icon: 'nav-yygl',
    title: '首页',
    hideMenu: false,
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
      },
    },
  ],
}

export default dashboard
