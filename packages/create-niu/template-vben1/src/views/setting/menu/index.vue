<template>
  <div class="serviceProcessRecord">
    <div class="searchBar">
      <a-form ref="formRef" layout="inline" :model="formState">
        <a-form-item name="title" label="菜单名称">
          <a-input v-model:value="formState.title" placeholder="请输入菜单名称" allowClear />
        </a-form-item>

        <a-form-item name="processRecords" label="状态">
          <a-select
            style="width: 220px"
            v-model:value="formState.processRecords"
            :options="[
              { label: '开启', value: '1' },
              { label: '禁用', value: '2' },
            ]"
            placeholder="请选择状态"
            allowClear
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
        <p class="title">菜单列表</p>
        <div>
          <a-button @click="handleAdd" type="primary">+ 新增</a-button>
        </div>
      </div>

      <a-table
        :dataSource="dataSource"
        :columns="columns"
        :loading="loading"
        :rowKey="(record: any) => record.menuId"
        :pagination="false"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'icon'">
            <SvgIcon :name="record.icon" />
          </template>

          <template v-if="column.dataIndex === 'hideMenu'">
            <a-switch
              v-model:checked="record.hideMenu"
              checked-children="启用"
              un-checked-children="禁用"
            />
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <a-button type="link" @click="handleEdit(record)">修改</a-button>
            <a-popconfirm title="确定删除吗？" @confirm="handleDeleteConfirm(record.menuId)">
              <a-button type="link">删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
    <EditMoal
      v-model:visible.sync="editMoalVisible"
      :record="currentRecord"
      :is-edit="isEditModal"
      @refresh="onSearch"
      :options="dataSource"
    />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, toRaw } from 'vue'
  import EditMoal from './EditModal.vue'
  import { columns } from './menu.data'
  import { deleteApi, getAllMenus } from '/@/apis/setting/menu'
  import { treeMap } from '/@/utils/helper/treeHelper'
  import SvgIcon from '/@/components/SvgIcon.vue'

  const formState = reactive<any>({
    title: '',
    processRecords: null,
  })
  const loading = ref<boolean>(false)
  const formRef = ref()
  const isEditModal = ref<boolean>(false)

  const onSearch = async () => {
    loading.value = true
    const data = await getAllMenus({ ...toRaw(formState) })

    dataSource.value = treeMap(data, {
      children: 'children',
      conversion: (data: any) => {
        if (!(data.children && data.children.length > 0)) {
          delete data.children
        }
        return {
          ...data,
          hideMenu: Boolean(data.hideMenu === 0),
        }
      },
    })

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

  // 编辑
  const handleEdit = (record: any) => {
    isEditModal.value = true
    editMoalVisible.value = true
    currentRecord.value = toRaw(record)
  }

  // 删除
  const handleDeleteConfirm = async (menuId: string) => {
    await deleteApi({ menuId })
    onSearch()
  }

  // 新增
  const handleAdd = () => {
    isEditModal.value = false
    editMoalVisible.value = true
    currentRecord.value = {}
  }
</script>

<style lang="less" scoped>
  .serviceProcessRecord {
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
