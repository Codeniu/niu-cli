import { ref } from 'vue'
import { dictionaryList } from '/@/apis/sys/dict'
import { CodeTypeEnum } from '/@/enums/dictEnum'

export { CodeTypeEnum } from '/@/enums/dictEnum'

const dicts = ref<any>({})

export function useDict() {
  const getDict = async (key: CodeTypeEnum) => {
    return new Promise((resolve, reject) => {
      if (dicts.value[key]) {
        resolve(dicts.value[key])
      } else {
        dictionaryList({ codeType: key })
          .then((res) => {
            if (res.success) {
              dicts.value[key] = res.data || []
              resolve(dicts.value[key])
            } else {
              reject(res.message)
            }
          })
          .catch((err) => {
            reject(err)
          })
      }
    })
  }

  return { getDict }
}
