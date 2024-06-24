<template>
  <div class="orgManage">
    <div class="orgManage-org"> <OrgTree @on-select="onSelect" /> </div>
    <div class="orgManage-wrap">
      <div class="tableWrap">
        <div class="option">
          <p class="title">部门信息</p>
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

        <a-modal :open="uploadVisibles" title="导入文件" width="800px">
          <template #footer>
            <a-button key="back" @click="onCancel">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="onSubmit">
              上传
            </a-button>
          </template>
          <div class="h-300px">
            <FileUpload
              v-model:file="files"
              type="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            >
              请上传
            </FileUpload>
          </div>
        </a-modal>

        <a-table
          :dataSource="dataSource"
          :columns="columns"
          :loading="loading"
          :rowKey="(record: any) => record.id"
          :scroll="scrollY"
          :pagination="getPagination"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'index'">
              {{ (pagination.pageNum - 1) * pagination.pageSize + index + 1 }}
            </template>
            <template v-if="column.dataIndex === 'operation'">
              <a-button type="link" style="padding: 4px" @click="handleEdit(record)">修改</a-button>
              <a-button type="link" style="padding: 4px" @click="handleDetial(record)">
                详情
              </a-button>
              <a-popconfirm title="确定删除吗？" @confirm="handleDeleteConfirm(record.deptId)">
                <a-button type="link" style="padding: 4px">删除</a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>

  <EditMoal
    v-model:open="editMoalVisible"
    :record="currentRecord"
    :modal-type="modalType"
    @refresh="onSearch"
  />

  <ViewModal v-model:open="viewMoalVisible" :record="currentRecord" />
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, toRaw } from 'vue'
  import { message } from 'ant-design-vue'
  import FileUpload from '/@/components/FileUpload/index.vue'
  import EditMoal from './components/EditModal.vue'
  import ViewModal from './components/ViewModal.vue'
  import { downloadByData } from '/@/utils/file/download'
  import OrgTree from './components/OrgTree.vue'
  import { ModalTypeEnum, columns } from './enum'

  import { deptList } from '/@/apis/sys/org'
  import { delDept, deptTemplate, deptImport } from '/@/apis/setting/dept'
  import { useMessage } from '/@/hooks/web/useMessage'

  const loading = ref<boolean>(false)
  const editMoalVisible = ref<boolean>(false)
  const viewMoalVisible = ref<boolean>(false)
  const modalType = ref(ModalTypeEnum.ADD)
  const dataSource = ref<any>([])
  const currentRecord = ref()
  const uploadVisibles = ref<boolean>(false)
  const files = ref([])
  const formState = reactive<any>({
    orgId: '',
  })
  const scrollY = computed(() => {
    return { y: document.body.clientHeight - 400 }
  })
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
      hideOnSinglePage: false,
      current: pagination.pageNum,
      onChange(page: number) {
        pagination.pageNum = page
        onSearch()
      },
    }
  })

  onMounted(() => {
    onSearch()
  })

  const onSelect: any = (selectedKeys: any) => {
    formState.orgId = selectedKeys[0]
    onSearch()
  }

  const onSearch = async () => {
    loading.value = true
    const { total, list } = await deptList({
      ...toRaw(formState),
      ...toRaw(pagination),
    })
    dataSource.value = list || []
    pagination.total = total
    loading.value = false
  }

  const { createMessage } = useMessage()

  // 新增
  const handleAdd = () => {
    if (!formState.orgId) {
      createMessage.warn('请先选择单位')
      return
    }
    modalType.value = ModalTypeEnum.ADD
    editMoalVisible.value = true
    currentRecord.value = {
      deptPid: formState.orgId,
    }
  }

  // 编辑
  const handleEdit = (record: any) => {
    modalType.value = ModalTypeEnum.EDIT
    editMoalVisible.value = true
    currentRecord.value = toRaw(record)
  }

  // 详情
  const handleDetial = (record: any) => {
    viewMoalVisible.value = true
    currentRecord.value = toRaw(record)
  }

  // 删除
  const handleDeleteConfirm = async (deptId: string) => {
    await delDept({ deptId })
    onSearch()
  }

  // 下载
  const handleDownload = async () => {
    const res = await deptTemplate()
    const fileName = '部门导入模板.xlsx'
    downloadByData(res, fileName)
  }

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

    try {
      loading.value = true
      const formData = new FormData()
      formData.append('file', files.value[0])

      await deptImport(formData)

      loading.value = false
      files.value = []
      uploadVisibles.value = false
    } catch (error) {
      console.log('error: ', error)
    } finally {
      loading.value = false
    }
  }
</script>

<style lang="less" scoped>
  .orgManage {
    height: 100%;
    padding: 24px;
    display: flex;
    gap: 20px;

    &-org {
      width: 260px;
      min-width: 260px;
      height: calc(100vh - 206px);
      min-height: 502px;
      background-color: #fff;
      overflow: auto;
    }

    &-wrap {
      flex: 1;
    }

    .tableWrap {
      min-height: 400px;
      height: calc(100vh - 206px);
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
