import type { ProjectConfig } from '/#/config'

import { defineStore } from 'pinia'
import { store } from '/@/store'

import { deepMerge } from '/@/utils'
import { PermissionModeEnum } from '/@/enums/appEnum'

interface AppState {
  // project config
  projectConfig: ProjectConfig | null
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    projectConfig: {
      permissionMode: PermissionModeEnum.ROUTE_MAPPING,
    },
  }),
  getters: {
    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig)
    },
  },
  actions: {
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
    },
  },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
