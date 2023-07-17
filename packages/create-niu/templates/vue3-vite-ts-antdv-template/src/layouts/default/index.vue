<template>
  <a-layout :style="{ minHeight: '100%' }">
    <Header />
    <a-layout>
      <!-- sider -->
      <Sider @collapsed="onCollapsed" />
      <!-- main -->
      <a-layout class="main-container">
        <div :style="{ height: '96px' }"></div>
        <div class="main-top main-top--fixed" :style="mainTopWidth">
          <Breadcrumb />
          <InfomationNavVue />
        </div>
        <a-layout-content
          class="main-content"
          :style="{
            minHeight: '200px',
          }"
        >
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Header from './header/index.vue'
  import Breadcrumb from './Breadcrumb.vue'
  import Sider from './sider/index.vue'
  import InfomationNavVue from './InfomationNav.vue'

  export default defineComponent({
    components: {
      Header,
      Breadcrumb,
      Sider,
      InfomationNavVue,
    },
    setup() {
      const mainTopWidth = ref('width: calc(100% - 210px)')
      function onCollapsed(width: string) {
        mainTopWidth.value = `width:calc(100% - ${width})`
      }
      return {
        onCollapsed,
        mainTopWidth,
      }
    },
  })
</script>
<style lang="less">
  .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }

  .main-top {
    width: calc(100% - 210px);
    background-color: #fff;
    transition: all 0.2s ease 0s;

    &--fixed {
      position: fixed;
      top: 65px;
      right: 0;
      z-index: 99;
    }
  }

  .main-content {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
  }
</style>
