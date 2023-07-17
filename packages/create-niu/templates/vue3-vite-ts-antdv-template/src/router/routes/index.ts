import { PageEnum } from '/@/enums/pageEnum'
import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types'

const modules = import.meta.globEager('./modules/**/*.ts')

// async routes
const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = [...routeModuleList]

// console.log('asyncRoutes:', asyncRoutes)

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}

export const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: '登录',
  },
}

export const updatePwd = {
  path: '/update-pwd',
  name: 'UpdatePwd',
  component: () => import('/@/views/sys/upadte-pwd/index.vue'),
  meta: {
    title: '修改密码',
  },
}

// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute, updatePwd]
