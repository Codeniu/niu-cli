<template>
  <a-layout :style="{ minHeight: '100%' }">
    <Header />
    <a-layout>
      <!-- sider -->
      <Sider
        :collapseOptions="collapseOptions"
        @change="tabChange"
        @root-click="rootClick"
        @parent-click="parentClick"
        @studio-select-change="studioSelectChange"
      />
      <!-- main -->
      <a-layout class="main-container">
        <div v-if="!isShow" :style="{ height: '96px' }"></div>
        <div v-if="!isShow" class="main-top main-top--fixed" :style="mainTopWidth">
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
<script>
  import { defineComponent, provide, ref, watch } from 'vue'
  import Header from '../default/header/index.vue'
  import Breadcrumb from '../default/Breadcrumb.vue'
  import Sider from './sider/index.vue'
  import InfomationNavVue from '../default/InfomationNav.vue'
  import {
    // getStudioTreeData,
    getStudioTree,
    // getMajorTreeData,
    getMajorTree,
  } from '/@/apis/user/user'
  import { useRouter } from 'vue-router'
  export default defineComponent({
    components: {
      Header,
      Breadcrumb,
      Sider,
      InfomationNavVue,
    },
    setup() {
      const isShow = ref(false)
      const { currentRoute } = useRouter()
      const studioId = ref('')
      const root = ref('')
      const majorCode = ref('')
      const collapseOptions = ref([])
      const mainTopWidth = ref('width: calc(100% - 280px)')

      provide('studioId', studioId)
      provide('root', root)
      provide('majorCode', majorCode)

      const rootClick = () => {
        root.value = 'root'
      }

      const parentClick = (val) => {
        majorCode.value = val
      }

      const studioSelectChange = (type) => {
        studioId.value = type
      }

      // 按单位查询
      const getStudio = async () => {
        try {
          let res = null
          // if (currentRoute.value.name == 'UserManage') {
          //   res = await getStudioTreeData()
          // } else {
          res = await getStudioTree()
          // }
          collapseOptions.value = res ? [res] : []
        } catch (error) {
          console.log(error)
        }
      }
      // 按专业查询组织
      const getMajor = async () => {
        try {
          let res = null
          // if (currentRoute.value.name == 'UserManage') {
          //   res = await getMajorTreeData()
          // } else {
          res = await getMajorTree()
          // }
          collapseOptions.value = [res] || []
          currentRoute.value.name == 'UserManage'
            ? collapseOptions.value[0].children.push({
                id: '999999',
                orgName: '点检专业',
                children: '',
              })
            : ''
        } catch (error) {
          console.log(error)
        }
      }
      watch(
        currentRoute,
        () => {
          isShow.value = ['Workbench', 'IntegralData', 'PlatformData'].includes(
            currentRoute.value.name,
          )
          tabChange('major')
        },
        {
          immediate: true,
        },
      )

      // 初始化组织数据
      // getMajor()

      // 按单位 or 按专业
      function tabChange(tabName) {
        switch (tabName) {
          case 'corp':
            getStudio()
            break
          case 'major':
            getMajor()
            break
          default:
            break
        }
      }
      return {
        mainTopWidth,
        collapseOptions,
        isShow,
        studioSelectChange,
        tabChange,
        rootClick,
        parentClick,
      }
    },
  })
</script>
<style lang="less" scoped>
  .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }

  .main-top {
    width: calc(100% - 280px);
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
