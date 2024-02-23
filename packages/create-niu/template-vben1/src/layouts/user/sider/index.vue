<template>
  <div :style="getStyle"></div>
  <a-layout-sider width="280" class="sider-container sider-container--fixed">
    <div class="menuTitle">
      <a-radio-group v-model:value="activeTab" button-style="solid" @change="handleTabChange">
        <a-radio-button value="major">按专业</a-radio-button>
        <a-radio-button value="corp">按单位</a-radio-button>
      </a-radio-group>
    </div>
    <a-collapse
      v-model:activeKey="rootKey"
      class="collapse-box"
      :accordion="true"
      :bordered="false"
      expand-icon-position="right"
    >
      <a-collapse-panel :key="collapseOptions[0]?.orgName">
        <template #header>
          <div
            :style="rootKey == collapseOptions[0]?.orgName ? 'color: #1890fa' : ''"
            @click="handleRootClick"
          >
            {{ collapseOptions[0]?.orgName }}
          </div>
        </template>
        <a-collapse
          class="collapse-box"
          v-model:activeKey="activeKey"
          :accordion="true"
          :bordered="false"
          expand-icon-position="right"
        >
          <a-collapse-panel :key="item.id" v-for="item in collapseOptions[0]?.children">
            <template #header>
              <div
                :style="activeKey == item.id ? 'color: #1890fa' : ''"
                @click="handleParentClick(item)"
              >
                {{ item.orgName }}
              </div>
            </template>
            <li
              :class="activeLi == child.id ? 'collapsePanelLi' : 'activeLi'"
              v-for="child in item.children"
              :key="child.id"
              @click="handleCollapseItemClick(child.id)"
            >
              {{ child.shortName || child.orgName }}
            </li>
          </a-collapse-panel>
        </a-collapse>
      </a-collapse-panel>
    </a-collapse>
  </a-layout-sider>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, watch } from 'vue'
  import { useRouter } from 'vue-router'

  type Item = {
    id: string | number
    orgName?: string
    shortName?: string
    children: Array<Item>
  }

  export default defineComponent({
    components: {},
    props: {
      collapseOptions: {
        type: Array<Item>,
        default: () => [],
      },
    },
    emits: ['studioSelectChange', 'change', 'rootClick', 'parentClick'],
    setup(props, { emit }) {
      const { currentRoute } = useRouter()
      const activeTab = ref('major')
      const activeKey = ref('')
      const rootKey = ref('')
      const activeLi = ref('')
      const getStyle = computed(() => {
        const width = '280px'
        return {
          width: width,
          overflow: 'hidden',
          flex: `0 0 ${width}`,
          'max-width': width,
          'min-width': width,
          transition: 'all 0.2s ease 0s',
        }
      })
      const handleCollapseItemClick = (id: any) => {
        activeLi.value = id
        emit('studioSelectChange', activeLi.value)
      }
      watch(
        () => props.collapseOptions,
        () => {
          rootKey.value = props.collapseOptions[0].orgName as string
        },
      )
      watch(currentRoute, () => {
        if (currentRoute.value.name == 'UserManage') {
          rootKey.value = props.collapseOptions[0].orgName as string
          activeKey.value = ''
          activeLi.value = ''
        }
      })
      function handleTabChange(e: any) {
        const tabName = e.target.value
        activeKey.value = ''
        activeLi.value = ''
        emit('change', tabName)
      }
      const handleRootClick = () => {
        emit('rootClick')
      }
      const handleParentClick = (item: any) => {
        if (item.id == '999999') {
          activeLi.value = ''
        }
        emit('parentClick', activeTab.value == 'major' ? item.id : '')
      }
      return {
        getStyle,
        activeKey,
        activeLi,
        activeTab,
        rootKey,
        handleCollapseItemClick,
        handleTabChange,
        handleRootClick,
        handleParentClick,
      }
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
  }

  .collapsePanelLi {
    color: #1890fa;
    background-color: #e6f7ff;
    padding: 7px 0px 10px 35px;
    border-right: 3px solid #1890fa;
    cursor: pointer;
    font-size: 14px;
  }

  .activeLi {
    padding: 7px 0px 10px 35px;
    cursor: pointer;
    font-size: 14px;
  }

  .ant-collapse-borderless > .ant-collapse-item {
    border-bottom: none;
  }

  .ant-collapse > .ant-collapse-item {
    border-bottom: none;
  }
</style>
