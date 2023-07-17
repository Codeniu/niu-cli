import type { Router } from 'vue-router'
import { configureDynamicParamsMenu } from '../helper/menuHelper'
import { Menu } from '../types'
import { PermissionModeEnum } from '/@/enums/appEnum'

import { usePermissionStoreWithOut } from '/@/store/modules/permission'

export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut()
  router.beforeEach(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next()
      return
    }

    // menu has been built.
    if (!permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    let menus: Menu[] = []
    if (isBackMode()) {
      menus = permissionStore.getBackMenuList
    } else if (isRouteMappingMode()) {
      menus = permissionStore.getFrontMenuList
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))

    next()
  })
}

// TODO 菜单资源由后台获取时更改为BACK模式
const getPermissionMode = () => {
  return PermissionModeEnum.ROUTE_MAPPING
}

const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}