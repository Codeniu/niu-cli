<template>
  <a-modal
    title="部门详情"
    @cancel="onCancel"
    :confirmLoading="confirmLoading"
    width="780px"
    :open="visible"
    :footer="null"
  >
    <a-form ref="formRef" :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-row>
        <a-col :span="24">
          <a-form-item label="部门名称" name="deptName">
            <span>{{ formState.deptName }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="部门描述" name="deptDesc">
            <span>{{ formState.deptDesc }}</span>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="属性" name="deptFlag">
            <span>{{ formState.deptFlag }}</span>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, toRaw, watch } from 'vue'

  const emits = defineEmits(['update:visible'])
  const props = defineProps({
    record: {
      type: Object,
      default: () => {},
    },
    visible: Boolean,
  })

  const formRef = ref()
  const confirmLoading = ref<boolean>(false)
  const formState = reactive<any>({
    deptPid: '',
    deptId: '',
    deptName: '',
    deptFlag: '',
    deptDesc: '',
  })

  watch(
    () => props.visible,
    async (val) => {
      if (val) {
        Object.assign(formState, { ...toRaw(props.record) })
        // console.log('props.record: ', toRaw(props.record))
        // console.log('formState: ', formState)
      }
    },
  )

  function onCancel() {
    formRef.value.resetFields()
    emits('update:visible', false)
  }
</script>

<style lang="less" scoped>
  .border {
    border: 1px solid;
  }
</style>
