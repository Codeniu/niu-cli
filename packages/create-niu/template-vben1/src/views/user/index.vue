<template>
  <div class="options">
    <div class="options-search">
      <a-input-search
        v-model:value="searchVal"
        placeholder="请输入"
        style="width: 30%"
        enter-button="搜索"
        allowClear
        @search="onSearch"
      />
    </div>
  </div>
  <div class="app-container">
    <a-radio-group v-model:value="activeTab" v-if="tabShow">
      <a-radio-button value="0">正式成员</a-radio-button>
      <a-radio-button value="6">实习成员</a-radio-button>
      <a-radio-button value="8">人员审核</a-radio-button>
    </a-radio-group>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :rowKey="(record) => record.id"
      :pagination="pagination"
      :loading="loading"
      :scroll="scrollY"
    >
      <template #photo="{ record }">
        <a-avatar :src="record.photo ? setOssAddress(record.photo) : ''" :size="36" />
      </template>
      <template #operation="{ record }">
        <a-popconfirm title="确定要删除吗？" @confirm="handleDeleteConfirm(record)">
          <a v-if="activeTab == 6">删除</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-popconfirm title="确定重置吗？" @confirm="handleReSetConfirm(record)">
          <a v-if="activeTab != 8">重置密码</a>
        </a-popconfirm>
        <a-popconfirm title="确定要通过吗？" @confirm="handlePassConfirm(record)">
          <a v-if="activeTab == 8 && isZGH && record.userType == 8">通过</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-button
          v-if="activeTab == 8 && isZGH && record.userType != 9"
          type="link"
          @click="handleRejectConfirm(record)"
          >退回</a-button
        >
      </template>
    </a-table>
  </div>
  <a-modal
    v-model:visible="visible"
    title="新增"
    @cancel="handleCancel"
    :width="700"
    :maskClosable="false"
  >
    <a-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 15 }"
    >
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="formData.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item label="性别" name="gender">
        <a-radio-group name="radioGroup" v-model:value="formData.gender">
          <a-radio value="男">男</a-radio>
          <a-radio value="女">女</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formData.phone" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item label="企业微信ID" name="weChatId">
        <a-input v-model:value="formData.weChatId" placeholder="请输入企业微信ID" />
      </a-form-item>
      <a-form-item label="民族" name="nation">
        <a-select
          v-model:value="formData.nation"
          :options="nationOptions"
          placeholder="请选择民族"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="出生时间" name="birthTime">
        <a-date-picker
          v-model:value="formData.birthTime"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="请选择出生时间"
        />
      </a-form-item>
      <a-form-item label="参工时间" name="positionTime">
        <a-date-picker
          v-model:value="formData.positionTime"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="请选择参工时间"
        />
      </a-form-item>
      <a-form-item label="文化程度" name="degree">
        <a-select
          v-model:value="formData.degree"
          :options="degreeOptions"
          placeholder="请选择文化程度"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="政治面貌" name="politicIdentity">
        <a-select
          v-model:value="formData.politicIdentity"
          :options="politicIdentityOptions"
          placeholder="请选择政治面貌"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="职务" name="positions">
        <a-select
          v-model:value="formData.positions"
          :options="positionsOptions"
          placeholder="请选择职务"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="职称" name="titles">
        <a-select
          v-model:value="formData.titles"
          :options="titlesOptions"
          placeholder="请选择职称"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="职业资格等级" name="vocationalLevel">
        <a-select
          v-model:value="formData.vocationalLevel"
          :options="vocationalLevelOptions"
          placeholder="请选择职业资格等级"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="职业分工" name="divideWork">
        <a-select
          v-model:value="formData.divideWork"
          :options="divideWorkOptions"
          placeholder="请选择职业分工"
          allow-clear
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <div style="text-align: center">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" :loading="confirmLoading" @click="handleSave">保存</a-button>
      </div>
    </template>
  </a-modal>
  <teleport to=".infomation-nav__options" v-if="showTeleport">
    <a-button @click="onImport"> 导入 </a-button>
    <a-dropdown>
      <template #overlay>
        <a-menu @click="handleDownload">
          <a-menu-item key="1">下载模板</a-menu-item>
        </a-menu>
      </template>
      <a-button style="margin-right: 10px">...</a-button>
    </a-dropdown>
    <a-button v-if="activeTab == 6" @click="handlePlus" type="primary"> 新增 </a-button>
  </teleport>
  <a-modal width="800px" title="导入" v-model:visible="importModalVisible" :footer="null">
    <div style="min-height: 200px">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="用户导入">
          <UserUploader @upload-success="onClose" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="头像导入" force-render>
          <HeaderUploader @upload-success="onClose" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
  <a-modal title="驳回原因" @cancel="handleClose" v-model:visible="rejectVisible">
    <a-form ref="rejectFormRef" :rules="rejectRules" :model="formState">
      <a-form-item label="驳回原因" name="userAddr">
        <a-textarea placeholder="请输入驳回原因" v-model:value="formState.userAddr" />
      </a-form-item>
    </a-form>
    <template #footer>
      <div style="text-align: center">
        <a-button @click="handleClose">取消</a-button>
        <a-button type="primary" @click="handleOk" :loading="confirmRejectLoading">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>
<script>
  import { ref, reactive, nextTick, inject, watch, computed } from 'vue'
  import {
    getUserData,
    getUserPointCheckData,
    addUser,
    resetPassword,
    delUser,
    passData,
    rejectData,
  } from '/@/apis/user/user'
  import { message } from 'ant-design-vue'
  import UserUploader from './components/UserUploader.vue'
  import HeaderUploader from './components/HeaderUploader.vue'
  import { CodeTypeEnum } from '/@/enums/dictEnum'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { dictionaryList } from '/@/apis/sys/dict'
  import { setOssAddress } from '/@/apis/sys/file'

  export default {
    components: {
      UserUploader,
      HeaderUploader,
    },
    setup() {
      const studioId = inject('studioId')
      const majorCode = inject('majorCode')
      const isZGH = ref(false)
      const isGZS = ref(false)
      const roles = sessionStorage.getItem('ROLES__KEY__')
      if (roles.includes('ZGH')) {
        isZGH.value = true
      }
      if (roles.includes('GZS')) {
        isGZS.value = true
      }
      const confirmRejectLoading = ref(false)
      const currentRecord = ref()
      const rejectVisible = ref(false)
      const formState = reactive({
        userAddr: '',
      })
      const rejectFormRef = ref()
      const { createMessage } = useMessage()
      const activeTab = ref('0')
      const showTeleport = ref(false)
      const confirmLoading = ref(false)
      const loading = ref(false)
      const searchVal = ref('')
      const formRef = ref()
      const importModalVisible = ref(false)
      const activeKey = ref('1')
      const tabShow = ref(true)
      const rejectRules = {
        userAddr: [
          {
            required: true,
            message: '请输入驳回原因',
            trigger: 'blur',
          },
        ],
      }
      const rules = {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
        ],
        gender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change',
          },
        ],
      }
      const nationOptions = ref([])
      const degreeOptions = ref([])
      const politicIdentityOptions = ref([])
      const positionsOptions = ref([])
      const titlesOptions = ref([])
      const vocationalLevelOptions = ref([])
      const divideWorkOptions = ref([])
      const formData = reactive({
        name: '',
        phone: '',
        gender: '',
        weChatId: '',
        nation: undefined,
        birthTime: '',
        positionTime: '',
        degree: undefined,
        politicIdentity: undefined,
        positions: undefined,
        titles: undefined,
        vocationalLevel: undefined,
        divideWork: undefined,
      })
      const visible = ref(false)
      const dataSource = ref([])
      const pagination = reactive({
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        showTotal: (total) => `共${total}条`,
        onShowSizeChange: (current, pageSize) => {
          pagination.current = current
          pagination.pageSize = pageSize
          getData()
        },
        onChange: (current, pageSize) => {
          pagination.current = current
          pagination.pageSize = pageSize
          getData()
        },
      })
      nextTick(() => {
        showTeleport.value = true
      })
      const columns = ref([])
      const defaultColumns = [
        {
          title: '序号',
          align: 'center',
          customRender: ({ index }) =>
            `${(pagination.current - 1) * pagination.pageSize + (index + 1)}`,
          width: 70,
        },
        {
          key: 'photo',
          dataIndex: 'photo',
          title: '头像',
          align: 'center',
          width: 90,
          slots: {
            customRender: 'photo',
          },
        },
        {
          key: 'name',
          dataIndex: 'name',
          title: '姓名',
          align: 'center',
          width: 90,
        },
        {
          title: '工作室',
          align: 'center',
          dataIndex: 'shortName',
          width: 150,
        },
        {
          title: '专业名称',
          align: 'center',
          dataIndex: 'majorName',
          width: 100,
        },
        {
          key: 'weChatId',
          dataIndex: 'weChatId',
          title: '企业微信ID',
          align: 'center',
          width: 120,
        },
        {
          key: 'phone',
          dataIndex: 'phone',
          title: '手机号',
          align: 'center',
          width: 120,
        },
        {
          key: 'gender',
          dataIndex: 'gender',
          title: '性别',
          align: 'center',
          width: 60,
        },
        {
          key: 'nation',
          dataIndex: 'nation',
          title: '民族',
          align: 'center',
          width: 90,
        },
        {
          key: 'birthTime',
          dataIndex: 'birthTime',
          title: '出生年月',
          align: 'center',
          width: 100,
        },
        // {
        //   key: 'positionTime',
        //   dataIndex: 'positionTime',
        //   title: '参加工作时间',
        //   align: 'center',
        //   width: 120,
        // },
        {
          key: 'degree',
          dataIndex: 'degree',
          title: '文化程度',
          align: 'center',
          width: 100,
        },
        {
          key: 'politicIdentity',
          dataIndex: 'politicIdentity',
          title: '政治面貌',
          align: 'center',
          width: 100,
        },
        {
          key: 'positions',
          dataIndex: 'positions',
          title: '职务',
          align: 'center',
          width: 120,
        },
        {
          key: 'titles',
          dataIndex: 'titles',
          title: '职称',
          align: 'center',
          width: 120,
        },
        {
          key: 'userType',
          dataIndex: 'userType',
          title: '状态',
          align: 'center',
          width: 100,
          customRender: ({ record }) => {
            return record.userType == 8 ? '待审核' : '已驳回'
          },
        },
        {
          key: 'userAddr',
          dataIndex: 'userAddr',
          title: '驳回原因',
          align: 'center',
          width: 120,
        },
        {
          key: 'operation',
          dataIndex: 'operation',
          title: '操作',
          align: 'center',
          width: '100',
          slots: {
            customRender: 'operation',
          },
        },
      ]
      const scrollY = computed(() => {
        return {
          x: 1800,
          y: document.body.clientHeight - 460,
        }
      })
      watch(studioId, () => {
        getData()
      })
      watch(majorCode, async (val) => {
        if (val == '999999') {
          tabShow.value = false
          try {
            loading.value = true
            const data = {
              pageNum: pagination.current,
              pageSize: pagination.pageSize,
            }
            const res = await getUserPointCheckData(data)
            dataSource.value = res.list || []
            pagination.total = res.total
            loading.value = false
          } catch (error) {
            loading.value = false
            console.log(error)
          }
        } else {
          tabShow.value = true
        }
      })

      const handleDownload = () => {
        console.log('下载')
      }
      const onImport = () => {
        console.log('导入')
        importModalVisible.value = true
      }
      const onSearch = () => {
        getData()
      }
      const handleCancel = () => {
        formRef.value.resetFields()
        visible.value = false
      }
      const handlePlus = () => {
        if (!studioId.value) {
          return message.warning('请先选择左侧工作室！')
        }
        visible.value = true
      }
      const handleDeleteConfirm = async (record) => {
        try {
          await delUser({ userId: record.userId })
          message.success('删除成功')
          getData()
        } catch (error) {
          console.error(error)
        }
      }
      const handleReSetConfirm = async (record) => {
        try {
          await resetPassword({ userId: record.userId })
          message.success('重置成功')
        } catch (error) {
          console.error(error)
        }
      }
      const handleSave = () => {
        formRef.value
          .validate()
          .then(async (values) => {
            try {
              confirmLoading.value = true
              await addUser({ ...values, orgId: studioId.value })
              message.success('新增成功！')
              confirmLoading.value = false
              visible.value = false
              getData()
            } catch (error) {
              visible.value = false
              confirmLoading.value = false
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
      const getData = async () => {
        try {
          loading.value = true
          const data = {
            userType: activeTab.value,
            name: searchVal.value,
            orgId: studioId.value,
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
          }
          const res = await getUserData(data)
          dataSource.value = res.list || []
          pagination.total = res.total
          loading.value = false
        } catch (error) {
          loading.value = false
          console.log(error)
        }
      }
      watch(
        activeTab,
        () => {
          if (activeTab.value == '8') {
            if (isZGH.value) {
              columns.value = defaultColumns
            } else if (isGZS.value) {
              columns.value = defaultColumns.filter((v) => !['操作'].includes(v.title))
            } else {
              columns.value = defaultColumns.filter(
                (v) => !['状态', '驳回原因', '操作'].includes(v.title),
              )
            }
          } else {
            columns.value = defaultColumns.filter(
              (v) => !['状态', '驳回原因', '操作'].includes(v.title),
            )
          }
          pagination.current = 1
          pagination.pageSize = 10
          getData()
        },
        { immediate: true },
      )

      const handlePassConfirm = async (record) => {
        const res = await passData({ id: record.userId })
        if (res.code == 200) {
          message.success('操作成功！')
          getData()
        } else {
          message.error(res.message)
        }
      }

      const handleRejectConfirm = async (record) => {
        currentRecord.value = record
        rejectVisible.value = true
      }

      const handleOk = async () => {
        rejectFormRef.value
          .validate()
          .then(async (values) => {
            try {
              confirmRejectLoading.value = true
              const res = await rejectData({
                id: currentRecord.value.userId,
                userAddr: values.userAddr,
              })
              if (res.code == 200) {
                message.success('操作成功！')
                getData()
                handleClose()
              } else {
                message.error(res.message)
              }
              confirmRejectLoading.value = false
            } catch (error) {
              confirmDeleteLoading.value = false
              console.log(error)
            }
          })
          .catch((error) => {
            confirmDeleteLoading.value = false
            console.log(error)
          })
      }

      function onClose() {
        importModalVisible.value = false
        getData()
      }
      const handleClose = () => {
        rejectVisible.value = false
        rejectFormRef.value.resetFields()
      }

      // 查询下拉数据
      const getOptions = async () => {
        try {
          const res = await dictionaryList({ codeType: CodeTypeEnum.NATION })
          if (res.code == 200) {
            nationOptions.value = (res?.data || []).map((v) => ({
              label: v.codeName,
              value: v.codeName,
            }))
          } else {
            createMessage.error(res.message)
            nationOptions.value = []
          }
        } catch (error) {
          createMessage.error(res.message)
        }
        try {
          const res = await dictionaryList({ codeType: CodeTypeEnum.DEGREE })
          if (res.code == 200) {
            degreeOptions.value = (res?.data || []).map((v) => ({
              label: v.codeName,
              value: v.codeName,
            }))
          } else {
            createMessage.error(res.message)
            degreeOptions.value = []
          }
        } catch (error) {
          createMessage.error(error.message)
        }
        try {
          const res = await dictionaryList({ codeType: CodeTypeEnum.POLITICAL_IDENTITY })
          if (res.code == 200) {
            politicIdentityOptions.value = (res?.data || []).map((v) => ({
              label: v.codeName,
              value: v.codeName,
            }))
          } else {
            createMessage.error(res.message)
            politicIdentityOptions.value = []
          }
        } catch (error) {
          createMessage.error(error.message)
        }
        try {
          const res = await dictionaryList({ codeType: CodeTypeEnum.POSITIONS })
          if (res.code == 200) {
            positionsOptions.value = (res?.data || []).map((v) => ({
              label: v.codeName,
              value: v.codeName,
            }))
          } else {
            createMessage.error(res.message)
            positionsOptions.value = []
          }
        } catch (error) {
          createMessage.error(error.message)
        }
        try {
          const res = await dictionaryList({ codeType: CodeTypeEnum.TITLES })
          if (res.code == 200) {
            titlesOptions.value = (res?.data || []).map((v) => ({
              label: v.codeName,
              value: v.codeName,
            }))
          } else {
            createMessage.error(res.message)
            titlesOptions.value = []
          }
        } catch (error) {
          createMessage.error(error.message)
        }
        try {
          const res = await dictionaryList({ codeType: CodeTypeEnum.VOCATIONAL_LEVEL })
          if (res.code == 200) {
            vocationalLevelOptions.value = (res?.data || []).map((v) => ({
              label: v.codeName,
              value: v.codeName,
            }))
          } else {
            createMessage.error(res.message)
            vocationalLevelOptions.value = []
          }
        } catch (error) {
          createMessage.error(error.message)
        }
        try {
          const res = await dictionaryList({ codeType: CodeTypeEnum.DIVIDE_WORK })
          if (res.code == 200) {
            divideWorkOptions.value = (res?.data || []).map((v) => ({
              label: v.codeName,
              value: v.codeName,
            }))
          } else {
            createMessage.error(res.message)
            divideWorkOptions.value = []
          }
        } catch (error) {
          createMessage.error(error.message)
        }
      }

      getOptions()
      getData()
      return {
        isZGH,
        scrollY,
        dataSource,
        tabShow,
        confirmLoading,
        loading,
        columns,
        visible,
        searchVal,
        pagination,
        showTeleport,
        formRef,
        confirmRejectLoading,
        rejectVisible,
        rejectFormRef,
        rejectRules,
        formState,
        formData,
        rules,
        studioId,
        nationOptions,
        degreeOptions,
        politicIdentityOptions,
        positionsOptions,
        titlesOptions,
        vocationalLevelOptions,
        divideWorkOptions,
        handleDownload,
        onImport,
        onSearch,
        handlePlus,
        handleCancel,
        handleSave,
        handleDeleteConfirm,
        handleReSetConfirm,
        importModalVisible,
        activeKey,
        activeTab,
        onClose,
        handlePassConfirm,
        handleRejectConfirm,
        setOssAddress,
        handleClose,
        handleOk,
      }
    },
  }
</script>
<style lang="less" scoped>
  @import '/@/design/mixins/index.less';

  .options {
    .p_options(10px 30px);
  }

  // .app-container {
  //   height: calc(100vh - 260px);
  // }
</style>
