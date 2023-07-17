import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'nav-yygl',
    title: '关于',
    orderNo: 100000,
    hideMenu: false,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/sys/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'nav-yygl',
        hideMenu: true,
      },
    },
  ],
}

export default about
