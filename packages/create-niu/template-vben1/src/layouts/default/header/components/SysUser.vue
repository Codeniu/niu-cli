<template>
  <div class="sys-user">
    <a-tooltip placement="top">
      <template #title>
        <span>操作手册</span>
      </template>
      <div class="help" @click="handleHelp">
        <SvgIcon name="help" size="19" />
      </div>
    </a-tooltip>

    <div v-if="isZGH" class="setting" @click="handelSettingClick">
      <SettingOutlined />
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
  import { SettingOutlined, BellOutlined } from '@ant-design/icons-vue'
  import { computed, defineComponent, onMounted, reactive, ref, toRaw } from 'vue'
  import { setOssAddress } from '/@/apis/sys/file'
  import { getHistoryTask, getTask } from '/@/apis/sys/notify'
  import { useGo } from '/@/hooks/web/usePage'
  import { usePermission } from '/@/hooks/web/usePermission'
  import { useUserStore } from '/@/store/modules/user'
  import EditPassword from './EditPassword.vue'
  import SvgIcon from '/@/components/SvgIcon.vue'
  import { openWindow } from '/@/utils'

  const { isZGH } = usePermission()

  // 代办类型
  const TASK_TYPE = [
    {
      key: '1',
      code: 'CLOUD_CLASS',
      label: '课程消息',
      children: [
        {
          key: '101',
          code: 'CLOUD_CLASS_APPLY',
          label: '课程申请',
          path: '/classroom/approval-detial',
          isJoinId: true,
        },
      ],
    },
    {
      key: '2',
      code: 'STZX',
      label: '师徒消息',
      children: [
        {
          key: '201',
          code: 'STZX_RELATION_APPROVE',
          label: '师徒关系审核',
          path: '/master/review',
        },
        {
          key: '203',
          code: 'STZX_RELATION_APPROVE',
          label: '师徒协议书/任务书审核',
          path: '/master/task',
        },
      ],
    },
    {
      key: '3',
      code: 'ZPGG',
      label: '摘牌攻关',
      children: [
        {
          key: '301',
          code: 'ZPGG_CHECK_APPLY',
          label: '摘牌攻关验收申请',
        },
        {
          key: '302',
          code: 'ZPGG_DELAY_APPLY',
          label: '摘牌攻关延期申请',
        },
      ],
    },
    {
      key: '4',
      code: 'GOLD_POINT',
      label: '金点子',
      children: [
        {
          key: '401',
          code: 'GOLD_POINT_REVIEW',
          label: '金点子评审通知',
        },
      ],
    },
  ]

  const userStore = useUserStore()
  const go = useGo()
  const userInfo = toRaw(userStore.getUserInfo)
  const listData = ref<any>([])
  const avatar = setOssAddress(userInfo.photo)
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
  // 跳转到设置页
  const handelSettingClick = () => {
    go('/setting')
  }
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
    // loading.value = true
    // const funcType = activeKey.value === '1' ? getTask : getHistoryTask
    // const { list, total } = await funcType({
    //   pageNum: pagination.current,
    //   pageSize: pagination.pageSize,
    // })
    // loading.value = false
    // listData.value = list || []
    // pagination.total = total
  }
  const count = computed(() => {
    return activeKey.value === '1' ? listData.value.length : 0
  })
  // 点击代办标题
  function handleTitleClick(item: any) {
    const { classify, secondClassify, tableId, isDone } = toRaw(item)

    if (isDone === '1') return

    const tasktype: any = TASK_TYPE.find((item: any) => item.key === classify)?.children.find(
      (item: any) => item.key === secondClassify,
    )
    console.log(toRaw(item))
    if (tasktype?.path) {
      const path = tasktype.isJoinId ? `${tasktype?.path}/${tableId}` : `${tasktype?.path}`
      go(path)
      popoverVisible.value = false
      getListData()
    }
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

  const handleHelp = () => {
    const helpBookName = '工作室联盟管理员操作手册.pdf'
    const helpBookSrc = setOssAddress(helpBookName)
    openWindow(helpBookSrc)
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
