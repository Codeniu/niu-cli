import { onMounted, ref } from 'vue'
import { getRoleList } from '/@/apis/setting/role'

export function useRoles() {
  const list = ref<any>([])
  const queryList = async () => {
    const data = await getRoleList()
    list.value = (data || []).map((v: any) => {
      return {
        label: v.roleName,
        value: v.roleId,
      }
    })
  }
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  onMounted(() => {
    queryList()
  })

  return { roleOptions: list, filterOption }
}
