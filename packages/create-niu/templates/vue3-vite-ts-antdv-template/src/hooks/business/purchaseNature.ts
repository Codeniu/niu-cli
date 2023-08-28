import { onMounted, ref } from 'vue'
import { queryPurNoList } from '/@/apis/review/supplier'

export function usePurchaseNature() {
  // 采购方式 TODO
  const purchaseNatureOptions = ref([])
  const getPurchaseNatureOptions = async () => {
    const data = await queryPurNoList()
    purchaseNatureOptions.value = (data || []).map((v: any) => {
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
    getPurchaseNatureOptions()
  })

  return { purchaseNatureOptions, filterOption }
}
