import type { AppRouteRecordRaw, Menu } from '/@/router/types'

import { defineStore } from 'pinia'
import { store } from '/@/store'
import { useUserStore } from './user'
import { toRaw } from 'vue'
import { flatMultiLevelRoutes, transformObjToRoute } from '/@/router/helper/routeHelper'
import { transformRouteToMenu } from '/@/router/helper/menuHelper'

import { asyncRoutes } from '/@/router/routes'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'

import { filter } from '/@/utils/helper/treeHelper'

import { getMenuList } from '/@/apis/sys/menu'
import { getPermCode } from '/@/apis/sys/login'

import { useMessage } from '/@/hooks/web/useMessage'
import { PageEnum } from '/@/enums/pageEnum'
import { PermissionModeEnum } from '/@/enums/appEnum'

interface PermissionState {
  // 权限代码列表
  permCodeList: string[] | number[]
  // 是否动态添加路由
  isDynamicAddedRoute: boolean
  // 触发菜单更新
  lastBuildMenuTime: number
  // 后台菜单
  backMenuList: Menu[]
  frontMenuList: Menu[]
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    // 是否动态添加路由
    isDynamicAddedRoute: false,
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // 后台菜单列表
    backMenuList: [],
    // 菜单列表
    frontMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.permCodeList = []
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    async changePermissionCode() {
      const codeList = await getPermCode()
      this.setPermCodeList(codeList)
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore()

      let routes: AppRouteRecordRaw[] = []
      const roleList = toRaw(userStore.getRoleList) || []

      // 权限模式
      const appStore = useAppStoreWithOut()
      const permissionMode: string = appStore.getProjectConfig.permissionMode

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { roles }: any = meta || {}
        if (!roles) return true
        return roleList.some((role: any) => roles.includes(role))
      }

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }
        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }

      // set routes
      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filter(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          // 将多级路由转为二级路由
          routes = flatMultiLevelRoutes(routes)
          break

        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filter(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          const menuList = transformRouteToMenu(routes, false)
          routes = filter(routes, routeRemoveIgnoreFilter)
          routes = routes.filter(routeRemoveIgnoreFilter)
          menuList.sort((a: any, b: any) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })
          // console.log('permission menuList', menuList)
          this.setFrontMenuList(menuList)
          // 将多级路由转为二级路由
          routes = flatMultiLevelRoutes(routes)
          // console.log('permission routes2', routes)
          break

        //  后台动态权限
        case PermissionModeEnum.BACK:
          const { createMessage } = useMessage()

          createMessage.loading({
            content: '菜单加载中...',
            duration: 1,
          })

          let routeList: AppRouteRecordRaw[] = []
          try {
            // this.changePermissionCode()
            const res = await getMenuList()
            const list = (res?.children as AppRouteRecordRaw[]) || []
            console.log('routeList', list)
            // 格式化请求到的资源信息
            // routeList = formatRouteList(res)
          } catch (error) {
            console.error(error)
          }

          // 动态引入组件
          routeList = transformObjToRoute(routeList)

          // 后台路由转为菜单结构
          const backMenuList = transformRouteToMenu(routeList)
          this.setBackMenuList(backMenuList)

          // remove meta.ignoreRoute item
          routeList = filter(routeList, routeRemoveIgnoreFilter)
          routeList = routeList.filter(routeRemoveIgnoreFilter)

          routeList = flatMultiLevelRoutes(routeList)
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]
          break
      }

      patchHomeAffix(routes)
      return routes
    },
  },
})

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
