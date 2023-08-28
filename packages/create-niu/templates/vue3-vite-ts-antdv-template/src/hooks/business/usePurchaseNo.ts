import { onMounted, ref } from 'vue'
import { queryPurNoList } from '/@/apis/review/supplier'

export function usePurchaseNo() {
  // 招标批次号
  const purchaseNoOptions = ref([])
  const getPurchaseNoOptions = async () => {
    const data = await queryPurNoList()
    purchaseNoOptions.value = (data || []).map((v: any) => {
      return {
        label: v,
        value: v,
      }
    })
  }
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }

  onMounted(() => {
    getPurchaseNoOptions()
  })

  return { purchaseNoOptions, filterOption }
}
