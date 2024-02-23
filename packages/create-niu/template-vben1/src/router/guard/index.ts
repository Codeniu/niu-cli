import type { Router, RouteLocationNormalized } from 'vue-router'
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel'
import { Modal, notification } from 'ant-design-vue'
import { warn } from '/@/utils/log'
import { createPermissionGuard } from './permissionGuard'
import nProgress from 'nprogress'
import { createParamMenuGuard } from './paramMenuGuard'

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createHttpGuard(router)
  createScrollGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createParamMenuGuard(router) // must after createPermissionGuard (menu has been built.)
}

/**
 * 当路由被切换时，用来关闭当前页面未完成请求的接口
 * @param router
 */
function createHttpGuard(router: Router) {
  const axiosCanceler: Nullable<AxiosCanceler> = new AxiosCanceler()
  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending()
    return true
  })
}

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href)
  }

  const body = document.body

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
    return true
  })
}

/**
 * Used to close the message instance when the route is switched
 * @param router
 */
export function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      Modal.destroyAll()
      notification.destroy()
    } catch (error) {
      warn('message guard error:' + error)
    }
    return true
  })
}

export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true
    }
    nProgress.start()
    return true
  })

  router.afterEach(async () => {
    nProgress.done()
    return true
  })
}
