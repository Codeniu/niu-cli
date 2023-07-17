import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const components: AppRouteModule = {
  path: '/components',
  name: 'Components',
  component: LAYOUT,
  redirect: '/components/index',
  meta: {
    hideChildrenInMenu: false,
    icon: 'nav-yygl',
    title: '组件',
    orderNo: 100000,
    hideMenu: false,
  },
  children: [
    {
      path: 'index',
      name: 'ComponentsPage',
      component: () => import('/@/views/sys/components-demo/index.vue'),
      meta: {
        title: 'teleport 示例',
        icon: 'nav-yygl',
        hideMenu: false,
      },
    },
    {
      path: 'context-menu',
      name: 'ContextMenuPage',
      component: () => import('/@/views/sys/components-demo/ContextMenu.vue'),
      meta: {
        title: '右键菜单',
        icon: 'nav-yygl',
        hideMenu: false,
      },
    },
    {
      path: 'message-box',
      name: 'MessageBoxPage',
      component: () => import('/@/views/sys/components-demo/MessageBox.vue'),
      meta: {
        title: '消息弹窗',
        icon: 'nav-yygl',
        hideMenu: false,
      },
    },
  ],
}

export default components
