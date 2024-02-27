import type { AppRouteModule } from '/@/router/types'

import { NORMAL_LAYOUT } from '/@/router/constant'

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: NORMAL_LAYOUT,
  redirect: '/about/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'communicate',
    title: '关于',
    orderNo: 5,
    hideMenu: false,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/sys/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'communicate',
        hideMenu: true,
      },
    },
  ],
}

export default about
