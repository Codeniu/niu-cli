<script>
  import { ref, reactive, computed, watch, toRaw, nextTick } from 'vue'
  import {
    getOrgAdminData,
    getStudioDirectorData,
    saveOrgAdmin,
    getUserByOrgId,
    editStudioAdmin,
    editStudioDirector,
  } from '/@/apis/setting/model/administratorManage'
  import { message } from 'ant-design-vue'
  import { cloneDeep } from 'lodash-es'
  import { getOrgData } from '/@/apis/setting'
  export default {
    name: 'AdministratorManage',
    setup() {
      const formRef = ref()
      const orgFormRef = ref()
      const title = ref('新增')
      const visible = ref(false)
      const loading = ref(false)
      const editTableData = ref({})
      const confirmLoading = ref(false)
      const orgFormModel = reactive({
        id: '',
        orgId: undefined,
        userName: '',
        userTitle: '',
        userPhone: '',
        // roleId: undefined,
      })
      const rules = {
        orgId: [
          {
            required: true,
            message: '请选择单位',
            trigger: 'change',
          },
        ],
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        userTitle: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
        ],
        userPhone: [
          {
            required: true,
            message: '请输入联系方式',
            trigger: 'blur',
          },
        ],
        // roleId: [
        //   {
        //     required: true,
        //     message: '请选择角色',
        //     trigger: 'change',
        //   },
        // ],
      }
      const userOptions = ref([])
      const orgOptions = ref([])
      const orgColumns = [
        // {
        //   title: '单位',
        //   dataIndex: 'orgName',
        //   align: 'center',
        // },
        {
          title: '用户名',
          dataIndex: 'userName',
          align: 'center',
        },
        {
          title: '姓名',
          dataIndex: 'userTitle',
          align: 'center',
        },
        {
          title: '联系方式',
          dataIndex: 'userPhone',
          align: 'center',
        },
        // {
        //   title: '角色',
        //   dataIndex: 'roleName',
        //   align: 'center',
        // },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          slots: {
            customRender: 'operation',
          },
        },
      ]
      const columns = ref([])
      const orgDataSource = ref([])
      const studioColumns = [
        {
          title: '单位',
          dataIndex: 'parentCorpName',
          align: 'center',
        },
        {
          title: '工作室',
          dataIndex: 'studioName',
          align: 'center',
        },
        {
          title: '专业组',
          dataIndex: 'majorName',
          align: 'center',
        },
        {
          title: '管理员姓名',
          dataIndex: 'adminName',
          align: 'center',
          slots: {
            customRender: 'adminName',
          },
        },
        {
          title: '账号',
          dataIndex: 'username',
          align: 'center',
        },
        {
          title: '车间主任',
          dataIndex: 'directorName',
          align: 'center',
          slots: {
            customRender: 'directorName',
          },
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          slots: {
            customRender: 'operation',
          },
        },
      ]
      const dataSource = ref([])
      const scrollY = computed(() => {
        return { y: document.body.clientHeight - 400 }
      })
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
      const tabType = ref('org')
      const formModel = reactive({
        orgId: undefined,
        roleId: undefined,
      })
      const roleOptions = reactive([
        {
          id: 1,
          label: '超级管理员',
          value: '1',
        },
        {
          id: 2,
          label: '省工会管理员',
          value: '2',
        },
        {
          id: 3,
          label: '单位工会管理员',
          value: '3',
        },
        {
          id: 4,
          label: '工作室管理员',
          value: '4',
        },
      ])
      watch(tabType, (val) => {
        pagination.current = 1
        pagination.pageSize = 10
        const columnsMap = {
          studio: studioColumns.filter((v) => v.title !== '车间主任'),
          director: studioColumns.filter((v) => v.title !== '管理员姓名'),
        }
        columns.value = columnsMap[val] || []
        getData()
      })
      const handleReSet = () => {
        formRef.value.resetFields()
        getData()
      }
      const handleQuery = () => {
        getData()
      }
      const handleDownload = () => {}
      const handleEdit = async (record) => {
        try {
          if (Object.keys(editTableData.value).length) {
            return message.warning('请先保存当前编辑数据！')
          }
          record.editFlag = true
          editTableData.value = cloneDeep(record)
          const data = await getUserByOrgId(record.id)
          userOptions.value = (data || []).map((v) => ({
            id: v.id,
            label: v.userTitle,
            value: v.id,
          }))
        } catch (error) {
          console.log(error)
        }
      }
      const handleItemEdit = (record) => {
        nextTick(() => {
          orgFormModel.id = record.id
          orgFormModel.orgId = record.orgId
          orgFormModel.userTitle = record.userTitle
          orgFormModel.userName = record.userName
          orgFormModel.userPhone = record.userPhone
          // orgFormModel.roleId = record.roleId
        })
        title.value = '编辑'
        visible.value = true
      }
      const handleRoleItem = (record) => {
        console.log(record)
      }
      const handlePlus = () => {
        visible.value = true
      }
      const getData = async () => {
        try {
          loading.value = true
          const urlMap = {
            org: getOrgAdminData,
            studio: getStudioDirectorData,
            director: getStudioDirectorData,
          }
          const res = await urlMap[tabType.value]({
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
          })
          if (tabType.value === 'org') {
            orgDataSource.value = res || []
          } else {
            dataSource.value = (res.list || []).map((v) => ({
              id: v.id,
              studioName: v.shortName,
              majorName: v.majorName,
              parentCorpName: v.parentCorpName,
              username: v.corpAdmin?.username,
              adminName: v.corpAdmin?.userTitle,
              adminId: v.corpAdmin?.id,
              directorName: v.director?.userTitle,
              directorId: v.director?.id,
              editFlag: false,
            }))
          }
          pagination.total = res.total
          loading.value = false
        } catch (error) {
          loading.value = false
          console.log(error)
        }
      }
      const handleDeleteConfirm = (record) => {
        console.log(record)
      }
      const handleReSetConfirm = (record) => {
        console.log(record)
      }
      const handleClose = () => {
        orgFormRef.value.resetFields()
        visible.value = false
      }
      const handleSave = () => {
        orgFormRef.value
          .validate()
          .then(async (values) => {
            confirmLoading.value = true
            await saveOrgAdmin(values)
            confirmLoading.value = false
            visible.value = false
            getData()
          })
          .catch((err) => {
            confirmLoading.value = false
            console.log(err)
          })
      }
      const adminChange = (record) => {
        console.log(toRaw(record))
      }
      const handleChange = async (record) => {
        try {
          const urlMap = {
            studio: editStudioAdmin,
            director: editStudioDirector,
          }
          const data = {
            orgId: record.id,
            userId: tabType.value === 'studio' ? record.adminId : record.directorId,
          }
          await urlMap[tabType.value](data)
          message.success('操作成功！')
          record.editFlag = false
          dataSource.value = dataSource.value.map((v) => {
            if (v.id === editTableData.value.id) {
              if (tabType.value === 'studio') {
                v.adminId = editTableData.value.adminId
                v.adminName = userOptions.value.find(
                  (u) => u.id === editTableData.value.adminId,
                )?.label
              } else {
                v.directorId = editTableData.value.directorId
                v.directorName = userOptions.value.find(
                  (u) => u.id === editTableData.value.directorId,
                )?.label
              }
              v.editFlag = false
              return v
            }
            return v
          })
          editTableData.value = {}
        } catch (error) {
          console.log(error)
        }
      }
      const handleCancelEdit = (record) => {
        if (editTableData.value.id && record.id === editTableData.value.id) {
          editTableData.value = {}
          record.editFlag = false
        }
      }
      const getOrgOptions = async () => {
        try {
          const data = await getOrgData()
          orgOptions.value = (data || []).map((v) => ({
            id: v.id,
            label: v.orgName,
            value: v.id,
          }))
        } catch (error) {
          console.log(error)
        }
      }
      getData()
      getOrgOptions()
      return {
        loading,
        confirmLoading,
        orgFormRef,
        rules,
        title,
        editTableData,
        visible,
        orgOptions,
        orgFormModel,
        tabType,
        formRef,
        formModel,
        roleOptions,
        orgDataSource,
        orgColumns,
        columns,
        dataSource,
        scrollY,
        pagination,
        userOptions,
        handleReSet,
        handleQuery,
        getData,
        handleDownload,
        handlePlus,
        handleEdit,
        handleItemEdit,
        handleDeleteConfirm,
        handleReSetConfirm,
        handleRoleItem,
        handleClose,
        handleSave,
        adminChange,
        handleChange,
        handleCancelEdit,
      }
    },
  }
</script>
<template>
  <!-- <div class="app-searchModel">
    <div>
      <a-form layout="inline" ref="formRef" :model="formModel">
        <a-form-item label="单位" name="orgId">
          <a-select
            ref="select"
            placeholder="请选择单位"
            v-model:value="formModel.orgId"
            style="width: 200px"
            allowClear
          >
            <a-select-option v-for="item in orgOptions" :key="item.id" :value="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="角色" name="roleId">
          <a-select
            ref="select"
            placeholder="请选择"
            v-model:value="formModel.roleId"
            style="width: 200px"
            allowClear
          >
            <a-select-option v-for="item in roleOptions" :key="item.id" :value="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>
    <div>
      <a-button @click="handleReSet">重置</a-button>
      <a-button @click="handleQuery" type="primary" style="margin-left: 20px">查询</a-button>
    </div>
  </div> -->
  <div class="app-container">
    <div class="app-container-content__tab">
      <div>
        <a-radio-group v-model:value="tabType" button-style="solid">
          <a-radio-button value="org">单位管理员</a-radio-button>
          <a-radio-button value="studio">工作室管理员</a-radio-button>
          <a-radio-button value="director">车间主任</a-radio-button>
        </a-radio-group>
      </div>
      <div>
        <a-button> 导入 </a-button>
        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleDownload">
              <a-menu-item key="1">下载模板</a-menu-item>
            </a-menu>
          </template>
          <a-button style="margin-right: 20px">...</a-button>
        </a-dropdown>
        <a-button v-if="tabType === 'org'" @click="handlePlus" type="primary"> 新增 </a-button>
      </div>
    </div>
    <div v-if="tabType === 'org'" class="app-container-content__table">
      <a-table
        :dataSource="orgDataSource"
        :rowKey="(record) => record.id"
        :columns="orgColumns"
        :scroll="scrollY"
        :loading="loading"
        :pagination="pagination"
      >
        <template #operation="{ record }">
          <a-button type="link" @click="handleItemEdit(record)">编辑</a-button>
          <a-popconfirm title="确定要删除吗?" @confirm="handleDeleteConfirm(record)">
            <a-button type="link">删除</a-button>
          </a-popconfirm>
          <a-popconfirm title="确定要重置吗?" @confirm="handleReSetConfirm(record)">
            <a-button type="link">重置密码</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <div v-else class="app-container-content__table">
      <a-table
        :dataSource="dataSource"
        :rowKey="(record) => record.id"
        :columns="columns"
        :scroll="scrollY"
        :loading="loading"
        :pagination="pagination"
      >
        <template #adminName="{ record }">
          <a-select
            v-if="record.editFlag"
            placeholder="请选择"
            v-model:value="editTableData.adminId"
            style="width: 100px"
            @change="handleChange(editTableData)"
          >
            <a-select-option v-for="item in userOptions" :key="item.id" :value="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
          <span v-else>
            {{ record.adminName }}
          </span>
        </template>
        <template #directorName="{ record }">
          <a-select
            v-if="record.editFlag"
            placeholder="请选择"
            v-model:value="record.directorId"
            style="width: 100px"
            @change="handleChange(record)"
          >
            <a-select-option v-for="item in userOptions" :key="item.id" :value="item.value">{{
              item.label
            }}</a-select-option>
          </a-select>
          <span v-else>
            {{ record.directorName }}
          </span>
        </template>
        <template #operation="{ record }">
          <div>
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
            <a-button type="link" @click="handleCancelEdit(record)">取消</a-button>
          </div>
        </template>
      </a-table>
    </div>
  </div>
  <a-modal :title="title" v-model:visible="visible" @cancel="handleClose">
    <a-form ref="orgFormRef" :rules="rules" :model="orgFormModel" :labelCol="{ span: 4 }">
      <a-form-item label="id" name="id" v-show="false">
        <span>{{ orgFormModel.id }}</span>
      </a-form-item>
      <a-form-item label="单位" name="orgId">
        <a-select v-model:value="orgFormModel.orgId" placeholder="请选择单位" allowClear>
          <a-select-option :key="item.id" v-for="item in orgOptions" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="用户名" name="userName">
        <a-input v-model:value="orgFormModel.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="姓名" name="userTitle">
        <a-input v-model:value="orgFormModel.userTitle" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item label="联系方式" name="userPhone">
        <a-input v-model:value="orgFormModel.userPhone" placeholder="请输入联系方式" />
      </a-form-item>
      <!-- <a-form-item label="角色" name="roleId">
        <a-select v-model:value="orgFormModel.roleId" placeholder="请选择角色" allowClear>
          <a-select-option :key="item.id" v-for="item in roleOptions" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
      </a-form-item> -->
    </a-form>
    <template #footer>
      <div style="text-align: center">
        <a-button @click="handleClose">取消</a-button>
        <a-button type="primary" :loading="confirmLoading" @click="handleSave">保存</a-button>
      </div>
    </template>
  </a-modal>
</template>
<style lang="less" scoped>
  .app-searchModel {
    padding: 24px;
    margin: 24px;
    background: #fff;
    display: flex;
    justify-content: space-between;
  }

  .app-container {
    height: calc(100vh - 210px);

    &-content {
      &__tab {
        display: flex;
        justify-content: space-between;
      }

      &__table {
        padding: 20px 0;
      }
    }
  }
</style>
