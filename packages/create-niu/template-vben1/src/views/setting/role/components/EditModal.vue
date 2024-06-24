<template>
  <a-modal
    :title="modalTitle"
    @ok="onSubmit"
    @cancel="onCancel"
    :confirmLoading="confirmLoading"
    width="780px"
    :open="open"
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
          <a-form-item label="角色名称" name="roleName">
            <a-input
              v-model:value="formState.roleName"
              placeholder="请输入角色名称"
              :disabled="modalType === ModalTypeEnum.EDIT"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="角色值" name="roleKey">
            <a-input
              v-model:value="formState.roleKey"
              placeholder="请输入角色值"
              :disabled="modalType === ModalTypeEnum.EDIT"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="菜单" name="sex">
            <MenuTree :menus="formState.menuIds" @on-check="onCheck" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { computed, inject, reactive, ref, toRaw, watch } from 'vue'
  import { ModalTypeEnum } from '../role.data'
  // import { queryMenuByRoleList } from '/@/apis/setting/role'
  import MenuTree from './MenuTree.vue'
  import { addRole, saveRoleMenu } from '/@/apis/setting/role'

  const emit = defineEmits(['update:open', 'refresh'])
  const props = defineProps({
    modalType: String,
    record: {
      type: Object,
      default: () => {},
    },
  })
  const formRef = ref()
  const confirmLoading = ref<boolean>(false)
  const rules = ref<any>({
    roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    roleKey: [{ required: true, message: '请输入角色值', trigger: 'blur' }],
  })
  const formState = reactive<any>({
    roleId: '',
    roleName: '',
    roleKey: '',
    menuIds: [],
  })
  const modalTitle = computed(() => {
    return `${props.modalType === ModalTypeEnum.ADD ? '新增角色' : '编辑角色'}`
  })

  const menus = ref<any>([])

  const onCheck = (keys: any) => {
    menus.value = keys
  }

  const open: any = inject('open')

  watch(
    () => open.value,
    async (val) => {
      if (val) {
        Object.assign(formState, { ...toRaw(props.record) })
        // console.log('props.record: ', toRaw(props.record))
        // console.log('formState: ', formState)

        if (props.modalType === ModalTypeEnum.ADD) {
          formState.menuIds = []
        }

        menus.value = formState.menuIds

        // 根据角色查询菜单
        // const { roleId } = toRaw(formState)
        // const data = await queryMenuByRoleList({ roleId })
        // console.log('data: ', data)
      }
    },
  )

  //  新增 or 编辑
  async function onSubmit() {
    const data = await formRef.value.validate()
    if (!data) return

    const { roleId, roleName, roleKey } = toRaw(formState)

    try {
      confirmLoading.value = true
      if (props.modalType === ModalTypeEnum.EDIT) {
        await saveRoleMenu({ menuIds: menus.value, roleId })
      } else {
        await addRole({ menuIds: menus.value, roleName, roleKey })
      }
      confirmLoading.value = false
      open.value = false
      emit('refresh')
    } catch (error) {
      console.log('error: ', error)
    }
  }

  function onCancel() {
    console.log('cancel')

    formRef.value.resetFields()
    // emit('update:open', false)
    open.value = false
  }
</script>

<style lang="less" scoped>
  .border {
    border: 1px solid;
  }
</style>
