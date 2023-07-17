<script>
  import { computed, reactive, ref, nextTick } from 'vue'
  import {
    getResource,
    deleteById,
    addResource,
    editResource,
  } from '/@/apis/setting/model/resourceManage'
  import { message } from 'ant-design-vue'
  import { DownOutlined, RightOutlined } from '@ant-design/icons-vue'
  export default {
    name: 'ResourceManage',
    components: {
      DownOutlined,
      RightOutlined,
    },
    setup() {
      const confirmLoading = ref(false)
      const formRef = ref()
      const title = ref('新增')
      const visible = ref(false)
      const loading = ref(false)
      const formData = reactive({
        id: '',
        resPid: '',
        resName: '',
        resCode: '',
        resValue: '',
      })
      const rules = {
        resName: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur',
          },
        ],
        resCode: [
          {
            required: true,
            message: '请输入资源编码',
            trigger: 'blur',
          },
        ],
        resValue: [
          {
            required: true,
            message: '请输入值',
            trigger: 'blur',
          },
        ],
      }
      const scrollY = computed(() => {
        return {
          y: document.body.clientHeight - 400,
        }
      })
      const columns = [
        {
          title: '名称',
          dataIndex: 'resName',
          align: 'center',
        },
        {
          title: '资源编码',
          dataIndex: 'resCode',
          align: 'center',
        },
        {
          title: '值',
          dataIndex: 'resValue',
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
      const dataSource = ref([])
      const getResourceData = async () => {
        try {
          loading.value = true
          const res = await getResource()
          dataSource.value = [res.data] || []
          loading.value = false
        } catch (error) {
          loading.value = false
          console.log(error)
        }
      }
      const handleDeleteConfirm = async (record) => {
        try {
          await deleteById(record.id)
          message.success('操作成功！')
          getResourceData()
        } catch (error) {
          console.log(error)
        }
      }
      const handleAdd = () => {
        if (!formData.resPid) {
          return message.warning('请先选中一行数据！')
        }
        visible.value = true
      }
      const handleSave = () => {
        formRef.value
          .validate()
          .then(async (values) => {
            try {
              confirmLoading.value = true
              values.resPid ? await addResource(values) : await editResource(values)
              message.success('操作成功！')
              getResourceData()
              handleCancel()
              confirmLoading.value = false
            } catch (error) {
              confirmLoading.value = false
              console.log(error)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
      const handleCancel = () => {
        formRef.value.resetFields()
        visible.value = false
      }
      const handleEdit = (record) => {
        nextTick(() => {
          formData.id = record.id
          formData.resName = record.resName
          formData.resCode = record.resCode
          formData.resValue = record.resValue
        })
        title.value = '编辑'
        visible.value = true
      }
      const customRow = (record) => {
        return {
          style: {
            backgroundColor: formData.resPid === record.id ? '#e6f7ff' : '',
          },
          onClick: () => {
            formData.resPid = record.id
          },
        }
      }
      getResourceData()
      return {
        formRef,
        columns,
        rules,
        dataSource,
        scrollY,
        title,
        loading,
        confirmLoading,
        visible,
        formData,
        handleDeleteConfirm,
        getResourceData,
        handleAdd,
        handleSave,
        handleCancel,
        handleEdit,
        customRow,
      }
    },
  }
</script>
<template>
  <div class="app-container">
    <div style="text-align: right; margin-bottom: 10px">
      <a-button type="primary" @click="handleAdd">新增</a-button>
    </div>
    <a-table
      :loading="loading"
      :columns="columns"
      :customRow="customRow"
      :dataSource="dataSource"
      :rowKey="(record) => record.id"
      :scroll="scrollY"
      :pagination="false"
      :defaultExpandedRowKeys="['1']"
    >
      <template #expandIcon="props">
        <div
          v-if="props.record.children.length"
          style="display: unset; margin-right: 10px; cursor: pointer; font-size: 10px"
        >
          <i
            @click="
              (e) => {
                props.onExpand(props.record, e)
              }
            "
            v-if="props.expanded"
            ><DownOutlined
          /></i>
          <i
            @click="
              (e) => {
                props.onExpand(props.record, e)
              }
            "
            v-else
            ><RightOutlined
          /></i>
        </div>
      </template>
      <template #operation="{ record }">
        <div>
          <a-button type="link" @click.stop="handleEdit(record)">编辑</a-button>
          <a-popconfirm title="确定删除吗？" @confirm.stop="handleDeleteConfirm(record)">
            <a type="link">删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
    <a-modal :title="title" @cancel="handleCancel" v-model:visible="visible">
      <a-form ref="formRef" :model="formData" :rules="rules" :labelCol="{ span: 4 }">
        <a-form-item name="id" v-show="false" label="id">
          <span>{{ formData.id }}</span>
        </a-form-item>
        <a-form-item name="resPid" v-show="false" label="父级资源ID">
          <span>{{ formData.resPid }}</span>
        </a-form-item>
        <a-form-item name="resName" label="名称">
          <a-input placeholder="请输入名称" v-model:value="formData.resName" />
        </a-form-item>
        <a-form-item name="resCode" label="资源编码">
          <a-input placeholder="请输入资源编码" v-model:value="formData.resCode" />
        </a-form-item>
        <a-form-item name="resValue" label="值">
          <a-input placeholder="请输入值" v-model:value="formData.resValue" />
        </a-form-item>
      </a-form>
      <template #footer>
        <div style="text-align: center">
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" :loading="confirmLoading" @click="handleSave">确定</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<style lang="less" scoped>
  .app-container {
    height: calc(100vh - 210px);
  }
</style>
