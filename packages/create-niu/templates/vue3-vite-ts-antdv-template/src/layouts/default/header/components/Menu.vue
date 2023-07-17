<template>
  <a-menu
    mode="horizontal"
    v-model:selectedKeys="selectedKeys"
    class="menu"
    @click="handleMenuClick"
  >
    <a-menu-item v-for="menu in menusRef" :key="menu.path">
      <div class="menu-item-content flex-col-center">
        <SvgIcon :name="menu.icon + ''" size="24" />
        <span>{{ menu.title }}</span>
      </div>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref, watchEffect } from 'vue'
  import SvgIcon from '/@/components/SvgIcon.vue'
  import { useGo } from '/@/hooks/web/usePage'
  import { getCurrentParentPath, getMenus } from '/@/router/menus'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    components: { SvgIcon },
    setup() {
      const go = useGo()

      const menusRef = ref<any[]>([])
      onMounted(async () => {
        menusRef.value = (await getMenus()).filter((menu) => !menu?.meta?.hidenInNav)
      })

      const handleMenuClick = (item: any) => {
        const key: string = item.key
        go(key)
      }

      const { currentRoute } = useRouter()
      const selectedKeys = ref<string[]>([])

      watchEffect(async () => {
        let path = currentRoute.value.path
        const parentPath = await getCurrentParentPath(path)
        selectedKeys.value = [parentPath]
      })

      return {
        selectedKeys,
        handleMenuClick,
        menusRef,
      }
    },
  })
</script>
<style lang="less" scoped>
  .menu {
    flex: 1;
    min-width: 150px;
    line-height: 64px;
    border: none;
    background-color: transparent;

    &-item-content {
      height: 100%;

      span {
        font-size: 14px;
        line-height: 28px;
      }
    }

    // 更改 ant 的默认样式
    :deep(.ant-menu-item) {
      height: 64px;
      width: 96px;
      text-align: center;
      color: #fff;

      &:hover {
        color: rgba(255, 255, 255, 0.616);
        // background-color: #56c9d2;
      }

      &::after {
        border: none;
      }

      &:hover::after {
        border: none;
      }
    }

    :deep(.ant-menu-item-selected) {
      background-color: #56c9d2;

      &::after {
        border: none;
      }
    }
  }
</style>
