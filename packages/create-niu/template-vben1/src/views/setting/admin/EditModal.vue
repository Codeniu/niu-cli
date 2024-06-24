<template>
  <a-modal
    title="编辑"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="confirmLoading"
    width="800px"
    :open="visible"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="账号" name="userName" v-if="props.isEdit">
        <!-- <a-input disabled v-model:value="formState.userName" placeholder="请输入账号" /> -->
        <span>{{ formState.userName }}</span>
      </a-form-item>

      <a-form-item label="姓名" name="nickName">
        <a-input v-model:value="formState.nickName" placeholder="请输入姓名" />
      </a-form-item>

      <!-- <a-form-item label="公司" name="orgName">
        <a-input v-model:value="formState.orgName" placeholder="请输入公司" />
      </a-form-item> -->

      <a-form-item label="公司部门" name="deptName">
        <a-tree-select
          v-model:value="formState.deptName"
          :tree-data="treeData"
          placeholder="请选择部门"
          allowClear
          :field-names="{
            children: 'childList',
            label: 'deptName',
            value: 'deptId',
          }"
          :treeDefaultExpandAll="true"
          show-search
          tree-node-filter-prop="deptName"
          :labelInValue="true"
        />
      </a-form-item>

      <a-form-item label="联系电话" name="phonenumber">
        <a-input v-model:value="formState.phonenumber" placeholder="请输入联系电话" />
      </a-form-item>

      <a-form-item label="角色" name="roleList">
        <a-select
          v-model:value="formState.roleList"
          :options="roleSelect.roleOptions"
          placeholder="请选择角色"
          allowClear
          show-search
          mode="multiple"
          :filter-option="roleSelect.filterOption"
        />
      </a-form-item>

      <!-- <a-form-item label="状态" name="hideMenu">
        <a-switch
          v-model:checked="formState.hideMenu"
          checked-children="启用"
          un-checked-children="禁用"
        />
      </a-form-item> -->
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref, toRaw, watch } from 'vue'
  import { add, update } from '/@/apis/setting/admin'
  import { orgTree } from '/@/apis/sys/org'
  import { treeMap } from '/@/utils/helper/treeHelper'

  const props = defineProps({
    isEdit: Boolean,
    visible: Boolean,
    record: {
      type: Object,
      default: () => {},
    },
    roleSelect: {
      type: Object,
      default: () => {
        return {
          roleOptions: [],
          filterOption: [],
        }
      },
    },
  })

  watch(
    () => props.visible,
    (val) => {
      if (val) {
        Object.assign(formState, toRaw(props.record))

        const { roleIds } = toRaw(props.record)

        formState.roleList = roleIds
        // console.log('props.record: ', toRaw(props.record))
        // console.log('formState.value: ', formState.value)

        if (!props.isEdit) {
          formState.nickName = ''
          formState.userName = ''
          formState.deptName = ''
          formState.phonenumber = ''
        }
      }
    },
  )

  const rules = ref<any>({
    nickName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  })
  const formState = reactive<any>({
    orgName: '',
    deptName: '',
    nickName: '',
    userName: '',
    phonenumber: '',
    roleList: [],
  })
  const formRef = ref()
  const confirmLoading = ref<boolean>(false)
  const emit = defineEmits(['update:visible', 'refresh'])

  //  新增 or 编辑
  async function onSubmit() {
    const data = await formRef.value.validate()
    if (!data) return

    const { deptName } = toRaw(formState)

    const queryData = {
      ...toRaw(formState),
      deptId: deptName.value,
      deptName: deptName.label,
    }

    if (props.isEdit) {
      await update(queryData)
    } else {
      await add(queryData)
    }

    emit('update:visible', false)
    emit('refresh')
  }

  function onCancel() {
    formRef.value.resetFields()
    emit('update:visible', false)
  }

  // 获取单位信息
  const orgOption = ref([])
  const treeData = ref([])
  const queryOrg = async () => {
    const res = await orgTree()
    treeData.value = treeMap(res, {
      children: 'childList',
      conversion: (data: any) => {
        return {
          ...data,
          selectable: !(data.childList && data.childList.length > 0),
        }
      },
    })

    orgOption.value = (res || []).map((v: any) => {
      return {
        label: v.deptName,
        value: v.deptId,
      }
    })
  }
  onMounted(async () => {
    queryOrg()
  })
</script>

<style lang="less" scoped>
  .border {
    border: 1px solid;
  }
</style>
