<template>
  <div :style="{ height: '64px' }"></div>
  <a-layout-header class="header header--fixed">
    <AppLogo />
    <Menu v-if="hasRole" />
    <SysUser v-if="hasRole" />
  </a-layout-header>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import AppLogo from './components/AppLogo.vue'
  import Menu from './components/Menu.vue'
  import SysUser from './components/SysUser.vue'
  export default defineComponent({
    components: {
      AppLogo,
      Menu,
      SysUser,
    },
    setup() {
      const ROLES__KEY__ = window.sessionStorage.getItem('ROLES__KEY__')
      const roles = JSON.parse(ROLES__KEY__ as string)
      const hasRole = ref<boolean>(roles && roles?.length > 0)
      return {
        hasRole,
      }
    },
  })
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    flex: 0 0 auto;
    color: #ffffff;
    background: @header-bg-color;

    &--fixed {
      position: fixed;
      z-index: 99;
      width: 100%;
      top: 0;
      left: 0;
    }
  }
</style>
