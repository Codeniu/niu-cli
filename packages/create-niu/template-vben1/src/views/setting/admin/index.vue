<template>
  <div class="admin">
    <div class="searchBar">
      <a-form ref="formRef" layout="inline" :model="formState">
        <a-form-item name="orgName" label="公司">
          <a-input
            v-model:value="formState.orgName"
            placeholder="请输入公司"
            style="width: 220px"
          />
        </a-form-item>
        <a-form-item name="deptName" label="部门">
          <a-input
            v-model:value="formState.deptName"
            placeholder="请输入部门"
            style="width: 220px"
          />
        </a-form-item>
        <a-form-item name="roleId" label="角色">
          <a-select
            style="width: 200px"
            v-model:value="formState.roleId"
            :options="roleOptions"
            placeholder="请选择角色"
            allowClear
            show-search
            :filter-option="filterOption"
          />
        </a-form-item>
      </a-form>
      <div>
        <a-button @click="handleReset"> 重置 </a-button>
        <a-button type="primary" @click="onSearch" :loading="loading" class="ml-10px">
          查询
        </a-button>
      </div>
    </div>

    <div class="tableWrap">
      <div class="option">
        <p class="title">管理员列表</p>
        <div>
          <span>
            <a-button @click="handleImport">导入</a-button>
            <a-dropdown>
              <template #overlay>
                <a-menu @click="handleDownload">
                  <a-menu-item key="1">下载模板</a-menu-item>
                </a-menu>
              </template>
              <a-button style="margin-right: 20px">...</a-button>
            </a-dropdown>
          </span>
          <a-button @click="handleAdd" type="primary">+ 新增</a-button>
        </div>
      </div>

      <a-modal :visible="uploadVisibles" title="导入文件" width="800px">
        <template #footer>
          <a-button key="back" @click="onCancel">取消</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="onSubmit">上传</a-button>
        </template>
        <div class="h-300px">
          <FileUpload
            v-model:file="files"
            type="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            请上传excel
          </FileUpload>
        </div>
      </a-modal>

      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :loading="loading"
        :rowKey="(record: any) => record.id"
        bordered
        :pagination="getPagination"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'roles'">
            <a-tag v-for="tag in record.roles" :key="tag.roleId">
              {{ tag.roleName }}
            </a-tag>
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
            <a-popconfirm title="确定删除吗？" @confirm="handleDeleteConfirm(record.userId)">
              <a-button type="link">删除</a-button>
            </a-popconfirm>
            <a-popconfirm title="确定重置吗？" @confirm="handleResetPassword(record.userId)">
              <a-button type="link">重置密码</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
    <EditMoal
      v-model:visible.sync="editMoalVisible"
      :record="currentRecord"
      :is-edit="isEditModal"
      :roleSelect="{
        roleOptions,
        filterOption,
      }"
      @refresh="onSearch"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, toRaw } from 'vue'
  import EditMoal from './EditModal.vue'
  import { columns } from './admin.data'
  import { message } from 'ant-design-vue'
  import {
    delApi,
    deptImport,
    downloadTemplate,
    getAllUser,
    resetPassword,
  } from '/@/apis/setting/admin'
  import { downloadByData } from '/@/utils/file/download'
  import { useRoles } from '/@/hooks/business/useRoles'
  import FileUpload from '/@/components/FileUpload/index.vue'

  const { roleOptions, filterOption } = useRoles()

  const formState = reactive<any>({
    orgName: null,
    deptName: null,
    roleId: null,
  })

  const loading = ref<boolean>(false)
  const formRef = ref()
  const isEditModal = ref<boolean>(false)

  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })
  const getPagination = computed(() => {
    return {
      total: pagination.total,
      pageSize: pagination.pageSize,
      size: 'small',
      hideOnSinglePage: true,
      current: pagination.pageNum,
      onChange(page: number) {
        pagination.pageNum = page
        onSearch()
      },
    }
  })

  const onSearch = async () => {
    loading.value = true

    const { list, total } = await getAllUser({ ...toRaw(formState), ...toRaw(pagination) })

    dataSource.value = list || []

    pagination.total = total

    loading.value = false
  }
  const handleReset = () => {
    formRef.value.resetFields()
    onSearch()
  }

  onMounted(() => {
    onSearch()
  })

  const dataSource = ref<any>([])
  const currentRecord = ref()
  const editMoalVisible = ref<boolean>(false)

  //  编辑
  const handleEdit = (record: any) => {
    isEditModal.value = true
    editMoalVisible.value = true
    const { roles } = toRaw(record)
    currentRecord.value = {
      ...toRaw(record),
      roleIds: roles.map((v: any) => v.roleId),
    }
  }

  //  删除
  const handleDeleteConfirm = async (userId: string) => {
    await delApi({ userId })
    onSearch()
  }

  // 重置密码
  const handleResetPassword = async (userId: string) => {
    await resetPassword({ userId })
    onSearch()
  }

  // 新增
  const handleAdd = () => {
    isEditModal.value = false
    editMoalVisible.value = true
    currentRecord.value = {}
  }

  // 导入
  const uploadVisibles = ref<boolean>(false)
  const files = ref([])

  function onCancel() {
    uploadVisibles.value = false
  }

  // 导入
  const handleImport = () => {
    uploadVisibles.value = true
  }

  // 上传文件
  async function onSubmit() {
    if (files.value.length === 0) {
      message.error('请导入一条数据')
      return
    }
    loading.value = true
    const formData = new FormData()

    formData.append('file', files.value[0])

    await deptImport(formData)
    loading.value = false
    files.value = []
    uploadVisibles.value = false
  }

  const handleDownload = async () => {
    const res = await downloadTemplate()
    const fileName = '账号信息模板.xlsx'
    downloadByData(res, fileName)
  }
</script>

<style lang="less" scoped>
  .admin {
    padding: 24px;

    .searchBar {
      display: flex;
      justify-content: space-between;
      padding: 24px 20px;
      border-radius: 2px;
      background-color: #fff;
    }

    .tableWrap {
      margin-top: 24px;
      padding: 20px 32px;
      background-color: #fff;

      .option {
        display: flex;
        justify-content: space-between;

        .title {
          font-size: 16px;
          color: #000;
        }
      }
    }
  }
</style>
