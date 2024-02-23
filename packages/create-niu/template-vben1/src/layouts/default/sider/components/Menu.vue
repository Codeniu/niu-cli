<template>
  <a-menu
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    :style="getStyle"
    @click="handleMenuClick"
    class="menu"
  >
    <template v-for="menu in menus" :key="menu.path">
      <a-sub-menu
        v-if="menu.children && menu.children?.length > 0"
        :key="menu.path"
        class="menu-sub-title"
      >
        <template #title>
          <MenuTitle :icon="menu.meta.icon" :title="menu.meta.title" />
        </template>
        <template v-if="menu && menu.children?.length > 0">
          <a-menu-item v-for="childMenu in menu.children" :key="childMenu.path">
            <MenuTitle :icon="childMenu.meta.icon" :title="childMenu.meta.title" />
          </a-menu-item>
        </template>
      </a-sub-menu>
      <template v-else>
        <a-menu-item :key="menu.path">
          <MenuTitle :icon="menu.meta.icon" :title="menu.meta.title" />
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<script lang="ts">
  import { defineComponent, computed, ref, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGo } from '/@/hooks/web/usePage'
  import { getCurrentParentPath, getChildrenMenus, getCurrentPathList } from '/@/router/menus'
  import MenuTitle from './MenuTitle.vue'

  export default defineComponent({
    components: { MenuTitle },
    props: {
      collapsed: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const { currentRoute } = useRouter()
      const go = useGo()

      const selectedKeys = ref<string[]>([])
      const openKeys = ref<string[]>([])

      const getStyle = computed(() => {
        const style: any = {
          borderRight: 0,
        }
        !props.collapsed && (style['width'] = '200px')
        return style
      })

      // 设置侧边栏菜单
      const menus = ref<any[]>([])
      watchEffect(async () => {
        let path = currentRoute.value.path
        const parentPath = await getCurrentParentPath(path)
        const pathList = await getCurrentPathList(path)
        const list = await getChildrenMenus(parentPath)
        menus.value = list
          .filter((item) => !item.meta?.hideMenu)
          .map((item) => {
            const children = item.children?.filter((child) => !child.meta?.hideMenu)
            return {
              ...item,
              children,
            }
          })
        selectedKeys.value = [path]
        openKeys.value = pathList
      })

      const handleMenuClick = ({ key, keyPath }: any) => {
        console.log('keyPath: ', keyPath)
        // openKeys.value = keyPath
        go(key)
      }

      return {
        selectedKeys,
        openKeys,
        getStyle,
        menus,
        handleMenuClick,
      }
    },
  })
</script>
<style lang="less" scoped>
  .menu {
    &-sub-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all 0.3s;
    }

    :deep(.ant-menu-item) {
      vertical-align: sub;
    }

    :deep(.ant-menu-item-selected) {
      // color: #56c9d2;
    }
  }
</style>
