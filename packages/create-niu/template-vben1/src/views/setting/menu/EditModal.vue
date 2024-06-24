<template>
  <a-modal
    title="修改菜单"
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
      <a-form-item label="上级菜单" name="title">
        <a-tree-select
          v-model:value="formState.parentId"
          :tree-data="options"
          placeholder="请选择上级菜单"
          allowClear
          show-search
          :fieldNames="{
            label: 'title',
            value: 'menuId',
            children: 'children',
          }"
        />
      </a-form-item>

      <a-form-item label="菜单名称" name="title">
        <a-input v-model:value="formState.title" placeholder="请输入菜单名称" />
      </a-form-item>

      <a-form-item label="Name" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入Name" />
      </a-form-item>

      <a-form-item label="Path" name="path">
        <a-input v-model:value="formState.path" placeholder="请输入path " />
        <span>注意: 根节点需要加 / </span>
      </a-form-item>

      <a-form-item label="组件" name="component">
        <a-input v-model:value="formState.component" placeholder="请输入组件" />
        <span> 可选的值有: LAYOUT、 NORMAL_LAYOUT、 USER_LAYOUT、 PAGE_LAYOUT </span>
      </a-form-item>

      <a-form-item label="图标" name="icon">
        <div class="flex justify-between">
          <!-- <a-input v-model:value="formState.icon" placeholder="请输入图标" />
          <SvgIcon :name="formState.icon" :size="36" /> -->

          <IconPicker v-model:value="formState.icon" />
        </div>
      </a-form-item>

      <a-form-item label="排序" name="orderNo">
        <a-input v-model:value="formState.orderNo" placeholder="请输入排序" />
      </a-form-item>

      <a-form-item label="状态" name="hideMenu">
        <a-switch
          v-model:checked="formState.hideMenu"
          checked-children="启用"
          un-checked-children="禁用"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref, toRaw, watch } from 'vue'
  import { add, update } from '/@/apis/setting/menu'
  import { IconPicker } from '/@/components/Icon'

  const props = defineProps({
    isEdit: Boolean,
    visible: Boolean,
    options: {
      type: Array,
      default: () => [],
    },
    record: {
      type: Object,
      default: () => {},
    },
  })

  watch(
    () => props.visible,
    (val) => {
      if (val) {
        Object.assign(formState, toRaw(props.record))
        // console.log('props.record: ', toRaw(props.record))
        // console.log('formState.value: ', formState.value)
      }
    },
  )

  const rules = ref<any>({
    title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
    name: [{ required: true, message: '请输入name', trigger: 'blur' }],
    component: [{ required: true, message: '请输入组件', trigger: 'blur' }],
    path: [{ required: true, message: '请输入path', trigger: 'blur' }],
    parentId: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
  })
  const formState = reactive<any>({
    title: '',
    name: '',
    component: '',
    orderNo: '',
    hideMenu: true,
    performanceDate: [],
    icon: '',
    path: '',
    parentId: '',
  })
  const formRef = ref()
  const confirmLoading = ref<boolean>(false)
  const emit = defineEmits(['update:visible', 'refresh'])

  //  新增 or 编辑
  async function onSubmit() {
    const data = await formRef.value.validate()
    if (!data) return

    const { hideMenu } = toRaw(formState)
    const params = {
      ...toRaw(formState),
      hideMenu: hideMenu ? 0 : 1,
    }

    delete params.children

    if (props.isEdit) {
      await update(params)
    } else {
      await add(params)
    }

    emit('refresh')
    emit('update:visible', false)
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
