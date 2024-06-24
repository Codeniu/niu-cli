<template>
  <div class="sys-user">
    <div class="setting" @click="openGithub">
      <GithubFilled />
    </div>

    <div class="notify">
      <a-popover
        title=""
        trigger="click"
        :visible="popoverVisible"
        @visible-change="handleClickChange"
      >
        <a-badge :count="count" dot>
          <BellOutlined
            :style="{
              fontSize: '18px',
              color: '#fff',
            }"
          />
        </a-badge>
        <template #content>
          <a-tabs v-model:activeKey="activeKey" class="my-tab" @change="onTabChange">
            <a-tab-pane key="1">
              <template #tab> 代办 </template>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab> 历史代办 </template>
            </a-tab-pane>
          </a-tabs>
          <div class="w-280px">
            <a-list bordered :pagination="getPagination" :loading="loading">
              <template v-for="item in listData" :key="item.id">
                <a-list-item>
                  <a-list-item-meta>
                    <template #title>
                      <span class="notify-title cursor-hand" @click="handleTitleClick(item)">
                        {{ item.titles }}
                      </span>
                    </template>
                    <template #description>
                      <a-tooltip placement="bottomLeft" :title="item.content">
                        <div class="text-wrap-2"> {{ item.content }} </div>
                      </a-tooltip>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
          </div>
        </template>
      </a-popover>
    </div>
    <a-dropdown>
      <div class="user cursor-hand">
        <img :src="avatar" style="width: 42px; height: 42px; border-radius: 50%" />
        <span class="w-86px text-wrap ml-10px">
          {{ userTitle }}
        </span>
      </div>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="editPassword">
            <span>修改密码</span>
          </a-menu-item>
          <a-menu-item key="logout">
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <EditPassword v-model:visible.sync="editPassowrdVisible" @logOut="handleLoginOut" />
</template>
<script lang="ts">
  defineComponent({
    name: 'SysUser',
  })
</script>

<script lang="ts" setup>
  import { BellOutlined, GithubFilled } from '@ant-design/icons-vue'
  import { computed, defineComponent, onMounted, reactive, ref, toRaw } from 'vue'
  import { useUserStore } from '/@/store/modules/user'
  import EditPassword from './EditPassword.vue'
  import { openWindow } from '/@/utils'

  const userStore = useUserStore()
  const userInfo = toRaw(userStore.getUserInfo)
  const listData = ref<any>([])
  const avatar = userInfo.photo
  const userTitle = userInfo.userTitle
  const pagination = reactive({
    current: 1,
    pageSize: 5,
    total: 0,
  })
  const loading = ref(false)
  const activeKey = ref('1')
  const popoverVisible = ref(false)

  onMounted(() => {
    getListData()
  })

  // login out
  function handleLoginOut() {
    userStore.confirmLoginOut()
  }
  function handleMenuClick(e: any) {
    switch (e.key) {
      case 'logout':
        handleLoginOut()
        break
      case 'editPassword':
        handleEditPassword()
        break
      default:
        break
    }
  }

  const editPassowrdVisible = ref<boolean>(false)
  function handleEditPassword() {
    editPassowrdVisible.value = true
  }
  // 获取代办列表
  async function getListData() {
    // todo fetch api
  }
  const count = computed(() => {
    return activeKey.value === '1' ? listData.value.length : 0
  })
  // 点击代办标题
  function handleTitleClick(item: any) {
    console.log(toRaw(item))
  }
  const getPagination = computed(() => {
    return {
      total: pagination.total,
      pageSize: pagination.pageSize,
      size: 'small',
      current: pagination.current,
      onChange(page: number) {
        pagination.current = page
        getListData()
      },
    }
  })
  function onTabChange(key: string) {
    listData.value = []
    pagination.current = 1
    getListData()
  }
  const handleClickChange = (visible: boolean) => {
    popoverVisible.value = visible
    if (visible) {
      getListData()
    }
  }

  const openGithub = () => {
    openWindow('https://github.com/Codeniu/niu-cli/tree/main/packages/create-niu/template-vben1')
  }
</script>
<style lang="less" scoped>
  .sys-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .setting,
  .help {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 0 8px;
    font-size: 18px;
    cursor: pointer;
  }

  .notify {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 0 8px;
    font-size: 18px;
    cursor: pointer;

    &-title {
      &:hover {
        color: #28b0ce;
      }
    }
  }

  .user {
    display: flex;
    align-items: center;
    margin: 0 8px;
  }
</style>
