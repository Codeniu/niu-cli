export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

/**
 * @description: default layout
 */
export const LAYOUT = () => import('/@/layouts/default/index.vue')

/**
 * @description: page layout
 */
export const PAGE_LAYOUT = () => import('/@/layouts/page/index.vue')

/**
 * @description: normal layout
 */
export const NORMAL_LAYOUT = () => import('/@/layouts/normal/index.vue')

/**
 * @description: parent-layout
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: _name,
      })
    })
}

export const EXCEPTION_COMPONENT = () => import('/@/views/sys/exception/Exception.vue')
