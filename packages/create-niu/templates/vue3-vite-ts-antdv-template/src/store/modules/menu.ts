import { defineStore } from 'pinia'
import { store } from '/@/store'
import type { Menu } from '/@/router/types'

interface MenuState {
  asideMenus: Menu[]
}

export const useMenuStore = defineStore({
  id: 'app-menu',
  state: (): MenuState => ({
    asideMenus: [],
  }),
  getters: {
    getAsideMenus(): Menu[] {
      return this.asideMenus
    },
  },
  actions: {
    setAsideMenus(menus: Menu[]) {
      this.asideMenus = menus
    },
  },
})

export function useMenuStoreWithOut() {
  return useMenuStore(store)
}
