import { onMounted, ref } from 'vue'
import { orgList } from '/@/apis/sys/org'

export function useOrg() {
  const list = ref<any>([])
  const queryList = async () => {
    const data = await orgList()
    list.value = (data || []).map((v: any) => {
      return {
        label: v.deptName,
        value: v.deptId,
      }
    })
  }
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  onMounted(() => {
    queryList()
  })

  return { orgList: list, filterOption }
}
