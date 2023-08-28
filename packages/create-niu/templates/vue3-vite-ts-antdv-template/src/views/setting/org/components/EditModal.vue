<template>
  <a-modal
    :title="modalTitle"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="confirmLoading"
    width="780px"
    :visible="visible"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-row>
        <a-col :span="24">
          <a-form-item label="部门名称" name="deptName">
            <a-input v-model:value="formState.deptName" placeholder="请输入部门名称" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="部门描述" name="deptDesc">
            <a-textarea
              v-model:value="formState.deptDesc"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              placeholder="请输入部门描述"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="属性" name="deptFlag">
            <a-select
              v-model:value="formState.deptFlag"
              :options="[
                { label: '项目管理', value: '项目管理' },
                { label: '人资', value: '人资' },
                { label: '业务', value: '业务' },
              ]"
              placeholder="请选择属性"
              allowClear
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, toRaw, watch } from 'vue'
  import { ModalTypeEnum } from '../enum'
  import { addDept, update } from '/@/apis/setting/dept'

  const emit = defineEmits(['update:visible', 'refresh'])
  const props = defineProps({
    modalType: String,
    record: {
      type: Object,
      default: () => {},
    },
    visible: Boolean,
  })

  const formRef = ref()
  const confirmLoading = ref<boolean>(false)
  const rules = ref<any>({
    deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
    deptFlag: [{ required: true, message: '请输入部门属性', trigger: 'blur' }],
    deptDesc: [{ required: true, message: '请输入部门描述', trigger: 'blur' }],
  })
  const formState = reactive<any>({
    deptPid: '',
    deptId: '',
    deptName: '',
    deptDesc: '',
    deptFlag: null,
  })
  const modalTitle = computed(() => {
    return props.modalType === ModalTypeEnum.ADD ? '新增' : '编辑' + '员工信息'
  })

  watch(
    () => props.visible,
    async (val) => {
      if (val) {
        Object.assign(formState, { ...toRaw(props.record) })

        if (props.modalType === ModalTypeEnum.ADD) {
          formState.deptId = ''
          formState.deptName = ''
          formState.deptDesc = ''
          formState.deptFlag = null
        }
        // console.log('props.record: ', toRaw(props.record))
        console.log('formState: ', toRaw(formState))
      }
    },
  )

  //  新增 or 编辑
  async function onSubmit() {
    const data = await formRef.value.validate()
    if (!data) return

    const queryData = {
      ...toRaw(formState),
    }

    try {
      confirmLoading.value = true
      if (props.modalType === ModalTypeEnum.EDIT) {
        await update(queryData)
      } else {
        await addDept(queryData)
      }
      confirmLoading.value = false
      emit('update:visible', false)
      emit('refresh')
    } catch (error) {
      console.log('error: ', error)
    }
  }

  function onCancel() {
    formRef.value.resetFields()
    emit('update:visible', false)
  }
</script>

<style lang="less" scoped>
  .border {
    border: 1px solid;
  }
</style>
