<template>
  <div class="bread">
    <a-breadcrumb style="margin: 16px 24px" :routes="routes">
      <template #itemRender="{ route, routes: routesMatched, paths }">
        <span v-if="!hasRedirect(routesMatched, route)">
          {{ route.meta.title }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
  import type { RouteLocationMatched } from 'vue-router'
  import { defineComponent, ref, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGo } from '/@/hooks/web/usePage'
  import { isString } from '/@/utils/is'
  import { REDIRECT_NAME } from '/@/router/constant'
  import { getMenus } from '/@/router/menus'
  import { getAllParentPath } from '/@/router/helper/menuHelper'
  import { Menu } from '/@/router/types'
  import { filter } from '/@/utils/helper/treeHelper'
  // import { router } from '/@/router'

  export default defineComponent({
    name: 'Breadcrumb',
    setup() {
      const routes = ref<RouteLocationMatched[]>([])
      const { currentRoute } = useRouter()
      const go = useGo()

      watchEffect(async () => {
        if (currentRoute.value.name === REDIRECT_NAME) return
        const menus = await getMenus()

        // const routeMatched = currentRoute.value.matched
        // const cur = routeMatched?.[routeMatched.length - 1]
        let path = currentRoute.value.path

        const parent = getAllParentPath(menus, path)
        const filterMenus = menus.filter((item) => item.path === parent[0])
        const matched = getMatched(filterMenus, parent) as any

        if (!matched || matched.length === 0) return

        const breadcrumbList = filterItem(matched)

        // console.log('breadcrumbList', breadcrumbList)

        routes.value = breadcrumbList
      })

      function getMatched(menus: any[], parent: string[]) {
        const metched: Menu[] = []
        menus.forEach((item) => {
          if (parent.includes(item.path)) {
            metched.push({
              ...item,
              name: item.meta?.title || item.name,
            })
          }
          if (item.children?.length) {
            metched.push(...getMatched(item.children, parent))
          }
        })
        return metched
      }

      function filterItem(list: RouteLocationMatched[]) {
        return filter(list, (item) => {
          const { meta, name } = item
          if (!meta) {
            return !!name
          }
          const { title, hideBreadcrumb, hideMenu } = meta
          if (!title || hideBreadcrumb || hideMenu) {
            return false
          }
          return true
        }).filter((item) => !item.meta?.hideBreadcrumb)
      }

      function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
        e?.preventDefault()
        const { children, redirect, meta } = route

        if (children?.length && !redirect) {
          e?.stopPropagation()
          return
        }
        if (meta?.carryParam) {
          return
        }

        if (redirect && isString(redirect)) {
          go(redirect)
        } else {
          let goPath = ''
          if (paths.length === 1) {
            goPath = paths[0]
          } else {
            const ps = paths.slice(1)
            const lastPath = ps.pop() || ''
            goPath = `${lastPath}`
          }
          goPath = /^\//.test(goPath) ? goPath : `/${goPath}`
          go(goPath)
        }
      }

      function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
        return routes.indexOf(route) !== routes.length - 1
      }

      return {
        routes,
        handleClick,
        hasRedirect,
      }
    },
  })
</script>
<style lang="less" scoped>
  .bread {
    height: 37px;
    background-color: #fff;
  }
</style>
