import { defineStore } from 'pinia'
import { store } from '/@/store'

interface ParamsState {
  templateParams: any
}

export const useTemplateParams = defineStore({
  id: 'template-params',
  state: (): ParamsState => ({
    templateParams: {},
  }),
  getters: {
    getTemplateParams(): any {
      return this.templateParams
    },
  },
  actions: {
    setTemplateParams(templateParams: any) {
      this.templateParams = templateParams
    },
  },
})

export function useTemplateParamsWithOut() {
  return useTemplateParams(store)
}
