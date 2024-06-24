<template>
  <div class="smg">
    <div class="tableWrap">
      <div class="option">
        <p class="title">角色</p>
        <a-button @click="handleAdd" type="primary">+ 新增</a-button>
      </div>

      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :loading="loading"
        :rowKey="(record: any) => record.id"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-button type="link" style="padding: 4px" @click="handleEdit(record)">修改</a-button>
            <!-- <a-popconfirm title="确定删除吗？" @confirm="handleDeleteConfirm(record.id)">
              <a-button type="link" style="padding: 4px">删除</a-button>
            </a-popconfirm> -->
          </template>
        </template>
      </a-table>
    </div>

    <EditMoal :record="currentRecord" :modal-type="modalType" @refresh="onSearch" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, toRaw, provide } from 'vue'
  import EditMoal from './components/EditModal.vue'
  import { ModalTypeEnum, columns } from './role.data'

  import { getRoleList } from '/@/apis/setting/role'

  const loading = ref<boolean>(false)
  const editMoalVisible = ref<boolean>(false)
  const modalType = ref(ModalTypeEnum.ADD)
  const dataSource = ref<any>([])
  const currentRecord = ref()

  provide('open', editMoalVisible)

  onMounted(() => {
    onSearch()
  })

  const onSearch = async () => {
    loading.value = true
    const list = await getRoleList()
    dataSource.value = list || []
    loading.value = false
  }

  // 新增
  const handleAdd = () => {
    modalType.value = ModalTypeEnum.ADD
    editMoalVisible.value = true
    currentRecord.value = {}
  }

  // 编辑
  const handleEdit = (record: any) => {
    modalType.value = ModalTypeEnum.EDIT
    editMoalVisible.value = true
    currentRecord.value = toRaw(record)
  }

  // TODO 删除
  // const handleDeleteConfirm = async (id: string) => {
  //   console.log('TODO 删除 ', id)
  //   // await deleteMisbehavior({ id })
  //   onSearch()
  // }
</script>

<style lang="less" scoped>
  .smg {
    height: 100%;
    padding: 24px;

    .tableWrap {
      min-height: 400px;
      padding: 20px 32px;
      background-color: #fff;

      .option {
        display: flex;
        justify-content: space-between;

        .title {
          font-size: 16px;
          color: #000;
          font-weight: 600;
        }
      }
    }
  }
</style>
