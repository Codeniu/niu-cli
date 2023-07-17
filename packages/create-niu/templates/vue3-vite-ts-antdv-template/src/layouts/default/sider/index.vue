<template>
  <div :style="getStyle"></div>
  <a-layout-sider width="210" class="sider-container sider-container--fixed" :collapsed="collapsed">
    <div class="menuTitle">{{ title }}</div>
    <ScrollContainer class="menuWrapper">
      <Menu :collapsed="collapsed" />
    </ScrollContainer>
    <div class="menuFooter" @click="handleCollapse">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </div>
  </a-layout-sider>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import Menu from './components/Menu.vue'
  import ScrollContainer from '/@/components/ScrollContainer/index.vue'
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    components: { Menu, ScrollContainer, MenuUnfoldOutlined, MenuFoldOutlined },
    emits: ['collapsed'],
    setup(props, { emit }) {
      const collapsed = ref<boolean>(false)
      const { currentRoute } = useRouter()

      const title = computed(() => {
        const route = currentRoute.value
        const rootRouter = route.matched[0]
        if (!route) {
          return '菜单'
        }
        return rootRouter.meta.title
      })

      function handleCollapse() {
        collapsed.value = !collapsed.value
      }

      const getStyle = computed(() => {
        const width = collapsed.value ? '80px' : '210px'
        emit('collapsed', width)
        return {
          width: width,
          overflow: 'hidden',
          flex: `0 0 ${width}`,
          'max-width': width,
          'min-width': width,
          transition: 'all 0.2s ease 0s',
        }
      })

      return { title, collapsed, handleCollapse, getStyle }
    },
  })
</script>
<style lang="less" scoped>
  .sider-container {
    z-index: 100;
    box-shadow: 5px 3px 5px #e3e4e5;
    background: #fff;

    &--fixed {
      position: fixed;
      top: 64px;
      left: 0;
      height: 100%;
    }
  }

  .menuTitle {
    width: 100%;
    height: 70px;
    line-height: 70px;
    font-size: 16px;
    text-align: center;
    font-weight: 600;
  }

  .menuWrapper {
    height: calc(100vh - 174px); // 70px + 40px + 64px
  }

  .menuFooter {
    width: 100%;
    height: 39px; // height:40
    padding: 0 20px;
    border-top: 1px solid #f0f2f5;
    line-height: 40px;
    font-size: 16px;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
      color: #2bb8c8;
      background: #fafafa;
      transition: 0.5s;
    }
  }
</style>
