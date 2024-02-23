<script lang="jsx">
  import { computed, ref, reactive, toRaw, nextTick, toRef } from 'vue'
  import { getRoles, addRole, updateRole, deleteRole } from '/@/apis/setting/model/rolePermission'
  import { message } from 'ant-design-vue'
  import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'
  import { getResource } from '/@/apis/setting/model/resourceManage'
  export default {
    name: 'RolePermission',
    components: {
      EditOutlined,
      DeleteOutlined,
    },
    setup() {
      const confirmLoading = ref(false)
      const visible = ref(false)
      const formRef = ref()
      const title = ref('角色新增')
      const loading = ref(false)
      const editableData = reactive({})
      const allPermissions = ref([])
      const curRecord = ref({})
      const formData = reactive({
        id: '',
        roleName: '',
        roleCode: '',
        roleType: '',
      })
      const rules = {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
        ],
        roleCode: [
          {
            required: true,
            message: '请输入角色编码',
            trigger: 'blur',
          },
        ],
        roleType: [
          {
            required: true,
            message: '请输入角色类型',
            trigger: 'blur',
          },
        ],
      }
      const scrollY = computed(() => {
        return {
          y: document.body.clientHeight - 400,
        }
      })
      const dataSource = ref([])
      const columns = [
        {
          title: '角色',
          dataIndex: 'roleName',
          align: 'center',
          width: '40%',
          slots: {
            customRender: 'roleName',
          },
          customCell: (record) => {
            return {
              style: {
                backgroundColor: curRecord.value.id === toRaw(record).id ? '#e6f7ff' : '',
              },
              onClick: () => {
                curRecord.value = toRef({})
                curRecord.value.id = curRecord.value.id ? null : toRaw(record).id
              },
            }
          },
        },
        {
          title: '权限分配',
          dataIndex: 'permission',
          align: 'center',
          width: '60%',
          customRender: ({ record, index }) => {
            return {
              children: (
                <a-tree
                  checkable
                  treeData={allPermissions.value}
                  v-model:checkedKeys={record.selectedPermissions}
                  selectable={false}
                  replace-fields={{
                    title: 'resName',
                    key: 'resCode',
                    children: 'children',
                  }}
                />
              ),
              props: {
                rowSpan: index === 0 ? dataSource.value.length : 0,
              },
            }
          },
        },
      ]
      const handleSave = () => {
        if (!curRecord.value.id) {
          return message.warning('请先选中一个角色！')
        }
        console.log(toRaw(dataSource))
      }
      const getAllRoles = async () => {
        try {
          loading.value = true
          const res = await getRoles()
          dataSource.value = (res.data.list || []).map((v) => ({
            ...v,
            selectedPermissions: [],
          }))
          loading.value = false
        } catch (error) {
          loading.value = false
          console.log(error)
        }
      }
      const saveRole = async () => {
        formRef.value
          .validate()
          .then(async (values) => {
            try {
              confirmLoading.value = true
              values.id ? await updateRole(values) : await addRole(values)
              message.success('操作成功！')
              confirmLoading.value = false
              handleCancel()
              getAllRoles()
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
      const handleAdd = () => {
        title.value = '角色新增'
        visible.value = true
      }
      const editRole = (record) => {
        visible.value = true
        title.value = '角色编辑'
        nextTick(() => {
          formData.id = record.id
          formData.roleName = record.roleName
          formData.roleCode = record.roleCode
          formData.roleType = record.roleType
        })
      }
      const handleDelConfirm = async (record) => {
        try {
          await deleteRole(record.id)
          message.success('操作成功！')
          getAllRoles()
        } catch (error) {
          console.log(error)
        }
      }
      const getResourceData = async () => {
        try {
          const res = await getResource()
          allPermissions.value = res.data.children || []
        } catch (error) {
          console.log(error)
        }
      }
      getAllRoles()
      getResourceData()
      return {
        formRef,
        curRecord,
        title,
        rules,
        visible,
        loading,
        confirmLoading,
        columns,
        dataSource,
        scrollY,
        formData,
        editableData,
        handleSave,
        getAllRoles,
        handleAdd,
        saveRole,
        handleCancel,
        editRole,
        handleDelConfirm,
      }
    },
  }
</script>
<template>
  <div class="app-container">
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px">
      <a-button style="margin-right: 10px" @click="handleAdd">角色新增</a-button>
      <a-button type="primary" @click="handleSave">权限保存</a-button>
    </div>
    <a-table
      :loading="loading"
      :columns="columns"
      :dataSource="dataSource"
      :rowKey="(record) => record.id"
      :pagination="false"
      :scroll="scrollY"
      bordered
    >
      <template #roleName="{ text, record }">
        <div class="editable-cell">
          <div class="editable-cell-text-wrapper">
            {{ text || '' }}
            <EditOutlined class="editable-cell-iconEdit" @click.stop="editRole(record)" />
            <a-popconfirm title="确定删除吗？" @confirm.stop="handleDelConfirm(record)">
              <DeleteOutlined class="editable-cell-iconDel" @click.stop="" />
            </a-popconfirm>
          </div>
        </div>
      </template>
    </a-table>
  </div>
  <a-modal :title="title" @cancel="handleCancel" v-model:visible="visible">
    <a-form ref="formRef" :model="formData" :rules="rules" :labelCol="{ span: 4 }">
      <a-form-item name="id" v-show="false" label="id">
        <span>{{ formData.id }}</span>
      </a-form-item>
      <a-form-item name="roleName" label="角色名称">
        <a-input placeholder="请输入角色名称" v-model:value="formData.roleName" />
      </a-form-item>
      <a-form-item name="roleCode" label="角色编码">
        <a-input placeholder="请输入角色编码" v-model:value="formData.roleCode" />
      </a-form-item>
      <a-form-item name="roleType" label="角色类型">
        <a-input placeholder="请选择角色类型" v-model:value="formData.roleType" />
      </a-form-item>
    </a-form>
    <template #footer>
      <div style="text-align: center">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" :loading="confirmLoading" @click="saveRole">确定</a-button>
      </div>
    </template>
  </a-modal>
</template>
<style lang="less" scoped>
  .app-container {
    height: calc(100vh - 210px);
  }

  .editable-cell {
    position: relative;

    &-iconEdit {
      display: none;
      margin-top: 5px;
      position: absolute;
      right: 25px;
      width: 20px;
      cursor: pointer;

      :hover {
        color: #108ee9;
      }
    }

    &-iconDel {
      display: none;
      margin-top: 5px;
      position: absolute;
      right: 0;
      width: 20px;
      cursor: pointer;

      :hover {
        color: #108ee9;
      }
    }

    :hover {
      .editable-cell-iconEdit,
      .editable-cell-iconDel {
        display: inline-block;
      }
    }

    &-text-wrapper {
      padding: 5px 24px 5px 5px;
    }
  }
</style>
