<script>
  import { computed, reactive, ref } from 'vue'
  import { cloneDeep } from 'lodash-es'
  import { getOrgData } from '/@/apis/setting/model/orgManage'
  export default {
    name: 'OrgManage',
    setup() {
      const loading = ref(false)
      const editableData = reactive({})
      const scrollY = computed(() => {
        return {
          y: document.body.clientHeight - 310,
        }
      })
      const options = reactive([
        {
          id: 1,
          label: '制丝专业组',
          value: '1',
        },
        {
          id: 2,
          label: '卷接包专业组',
          value: '2',
        },
        {
          id: 3,
          label: '动力专业组',
          value: '3',
        },
      ])
      const dataSource = ref([])
      const columns = [
        {
          title: '单位',
          dataIndex: 'orgName',
          align: 'center',
          customRender: ({ text, record }) => {
            const obj = {
              children: text,
              props: {
                rowSpan: record.rowSpan,
              },
            }
            return obj
          },
        },
        {
          title: '工作室',
          dataIndex: 'studioName',
          align: 'center',
          slots: {
            customRender: 'studioName',
          },
        },
        {
          title: '专业组',
          dataIndex: 'majorName',
          align: 'center',
          // slots: {
          //   customRender: 'professionalGroup',
          // },
        },
        {
          title: '备注',
          dataIndex: 'remark',
          align: 'center',
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
      const handleEdit = (id) => {
        editableData[id] = cloneDeep(dataSource.value.filter((v) => v.id === id)[0])
      }
      const handleDeleteConfirm = (id) => {
        console.log(id)
      }
      const handleSave = (id) => {
        editableData[id]['professionalGroup'] = options.find(
          (v) => v.value === editableData[id]['professionalGroupId'],
        ).label
        Object.assign(dataSource.value.filter((v) => v.id === id)[0], editableData[id])
        delete editableData[id]
      }
      const handleCancelConfirm = (id) => {
        delete editableData[id]
      }
      const getOrg = async () => {
        try {
          const data = await getOrgData()
          dataSource.value = (data.children || []).reduce((result, current) => {
            current.children.forEach((e, i) => {
              const item = {
                id: e.id,
                orgName: current.orgName,
                studioName: e.shortName,
                majorName: e.majorName,
                remark: '',
                rowSpan: i === 0 ? current.children.length : 0,
              }
              result.push(item)
            })
            return result
          }, [])
        } catch (error) {
          console.log(error)
        }
      }
      getOrg()
      return {
        dataSource,
        columns,
        loading,
        options,
        scrollY,
        editableData,
        handleEdit,
        handleDeleteConfirm,
        handleSave,
        handleCancelConfirm,
        getOrg,
      }
    },
  }
</script>
<template>
  <div class="app-container">
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :loading="loading"
      :rowKey="(record) => record.id"
      :scroll="scrollY"
      :pagination="false"
      bordered
    >
      <template #studioName="{ text, record }">
        <a-input
          v-if="editableData[record.id]"
          v-model:value="editableData[record.id].studioName"
          style="width: 60%"
        />
        <span v-else>{{ text }}</span>
      </template>
      <template #professionalGroup="{ text, record }">
        <a-select
          v-if="editableData[record.id]"
          v-model:value="editableData[record.id].professionalGroupId"
          allowClear
          placeholder="请选择"
          style="width: 60%"
        >
          <a-select-option :key="item.id" v-for="item in options" :value="item.value">{{
            item.label
          }}</a-select-option>
        </a-select>
        <span v-else>{{ text }}</span>
      </template>
      <template #operation="{ record }">
        <span v-if="editableData[record.id]">
          <a-button type="link" @click="handleSave(record.id)">保存</a-button>
          <a-popconfirm title="确定取消吗?" @confirm="handleCancelConfirm(record.id)">
            <a>取消</a>
          </a-popconfirm>
        </span>
        <a-button v-else type="link" @click="handleEdit(record.id)">编辑</a-button>
        <a-popconfirm title="确定删除吗？" @confirm="handleDeleteConfirm(record.id)">
          <a-button type="link">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<style lang="less" scoped>
  .app-container {
    height: calc(100vh - 210px);
  }
</style>
