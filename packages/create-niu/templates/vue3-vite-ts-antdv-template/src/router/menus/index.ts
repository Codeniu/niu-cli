import { RouteRecordNormalized } from 'vue-router'
import { router } from '/@/router'
import { getAllParentPath, transformMenuModule } from '../helper/menuHelper'
import { PermissionModeEnum } from '/@/enums/appEnum'
import type { Menu } from '/@/router/types'
import { usePermissionStore } from '/@/store/modules/permission'
import { filter } from '/@/utils/helper/treeHelper'
import { isUrl } from '/@/utils/is'

const modules = import.meta.globEager('../routes/modules/**/*.ts')

const menuModules: any[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  menuModules.push(...modList)
})

// ===========================
// ==========Helper===========
// ===========================

const getPermissionMode = () => {
  return PermissionModeEnum.ROUTE_MAPPING
}
const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}

const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}

const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE
}

const staticMenus: Menu[] = []
;(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0)
  })

  for (const menu of menuModules) {
    staticMenus.push(transformMenuModule(menu))
  }
})()

async function getAsyncMenus() {
  const permissionStore = usePermissionStore()
  if (isBackMode()) {
    return permissionStore.getBackMenuList.filter((item) => !item.meta?.hideMenu && !item.hideMenu)
  }
  if (isRouteMappingMode()) {
    return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu)
  }
  return staticMenus
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus()
  if (isRoleMode()) {
    const routes = router.getRoutes()
    return filter(menus, basicFilter(routes))
  }
  return menus
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus()
  const allParentPath = await getAllParentPath(menus, currentPath)
  return allParentPath?.[0]
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus()
  const parent = menus.find((item) => item.path === parentPath)
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) {
    return [] as Menu[]
  }
  if (isRoleMode()) {
    const routes = router.getRoutes()
    return filter(parent.children, basicFilter(routes))
  }
  return parent.children
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true

      const isSame = route.path === menu.path
      if (!isSame) return false

      if (route.meta?.ignoreAuth) return true

      return isSame
    })

    if (!matchRoute) return false
    menu.icon = (menu.icon || matchRoute.meta.icon) as string
    menu.meta = matchRoute.meta
    return true
  }
}
