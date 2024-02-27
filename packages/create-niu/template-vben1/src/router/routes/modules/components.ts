import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const components: AppRouteModule = {
  path: '/components',
  name: 'Components',
  component: LAYOUT,
  redirect: '/components/index',
  meta: {
    hideChildrenInMenu: false,
    icon: 'code-apply',
    title: '组件',
    orderNo: 2,
    hideMenu: false,
  },
  children: [
    {
      path: 'index',
      name: 'ComponentsPage',
      component: () => import('/@/views/sys/components-demo/index.vue'),
      meta: {
        title: 'teleport 示例',
        icon: '',
        hideMenu: false,
      },
    },
    {
      path: 'context-menu',
      name: 'ContextMenuPage',
      component: () => import('/@/views/sys/components-demo/ContextMenu.vue'),
      meta: {
        title: '右键菜单',
        icon: '',
        hideMenu: false,
      },
    },
    {
      path: 'message-box',
      name: 'MessageBoxPage',
      component: () => import('/@/views/sys/components-demo/MessageBox.vue'),
      meta: {
        title: '消息弹窗',
        icon: '',
        hideMenu: false,
      },
    },
    {
      path: 'menus',
      name: 'Menus',
      redirect: '/menus/menu-1',
      meta: {
        title: '级联菜单',
        icon: '',
        hideMenu: false,
      },
      children: [
        {
          path: 'menu-1',
          name: 'Menu1',
          component: () => import('/@/views/sys/components-demo/menus.vue'),
          meta: {
            title: '菜单一',
            icon: '',
            hideMenu: false,
          },
        },
        {
          path: 'menu-2',
          name: 'Menu2',
          component: () => import('/@/views/sys/components-demo/menus.vue'),
          meta: {
            title: '菜单二',
            icon: '',
            hideMenu: false,
          },
        },
        {
          path: 'menu-3',
          name: 'Menu3',
          component: () => import('/@/views/sys/components-demo/menus.vue'),
          meta: {
            title: '菜单三',
            icon: '',
            hideMenu: false,
          },
        },
      ],
    },
  ],
}

export default components
