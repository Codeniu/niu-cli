import { defineStore } from 'pinia'
import { store } from '/@/store'
import type { UserInfo } from '/#/store'
import { router } from '/@/router'
import { PageEnum } from '/@/enums/pageEnum'
import { RoleEnum } from '/@/enums/roleEnum'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum'
import { GetUserInfoModel, LoginParams, wechatLoginParam } from '/@/apis/sys/model/loginModel'
import { ErrorMessageMode } from '/#/axios'
import { doLogout, getUserInfo as getUserInfoApi, loginApi, wechatLogin } from '/@/apis/sys/login'
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic'
import { RouteRecordRaw } from 'vue-router'
import { usePermissionStore } from './permission'
import { isArray } from '/@/utils/is'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { useMessage } from '/@/hooks/web/useMessage'
import { h } from 'vue'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  sessionTimeout?: boolean
  lastUpdateTime: number
  roleList: RoleEnum[]
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    // roleList
    roleList: [],
  }),
  getters: {
    getUserInfo(): any {
      return this.userInfo || getAuthCache(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache(TOKEN_KEY)
    },
    getRoleList(): any {
      return this.roleList.length > 0 ? this.roleList : JSON.parse(getAuthCache(ROLES_KEY))
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(info: string | undefined) {
      const token = info ? `inno-${info}` : '' // for null or undefined value
      this.token = token
      setAuthCache(TOKEN_KEY, token)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, JSON.stringify(info))
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, JSON.stringify(roleList))
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const data = await loginApi(loginParams, mode)
        const { token } = data

        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * @description: 微信扫码登录
     */
    async qrcodeLogin(
      params: wechatLoginParam & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const res = await wechatLogin(loginParams, mode)
        const token = res.data || undefined

        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null
      // get user info
      const userInfo = await this.getUserInfoAction()

      const sessionTimeout = this.sessionTimeout

      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = usePermissionStore()

        const routes = await permissionStore.buildRoutesAction()
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw)
        })
        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
        permissionStore.setDynamicAddedRoute(true)

        // 路由到首个菜单项
        // const firtMenus = (routes[1]?.children || []).filter((item) => !item.redirect)
        // const firtMenuPath = firtMenus[0]?.path

        // 密码超过90天跳转到修改密码页面
        // @ts-ignore
        const { createdTime } = userInfo || null

        if (createdTime) {
          const NINETY_DAY_TO_TIMESTAMP = 90 * 24 * 60 * 60 * 1000

          const createdTimeStamp = new Date(createdTime).valueOf()

          const isPasswordExpired =
            new Date().valueOf() - createdTimeStamp > NINETY_DAY_TO_TIMESTAMP

          if (isPasswordExpired) {
            console.log(isPasswordExpired)

            router.push({
              path: '/update-pwd',
            })
          }
        } else {
          goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
        }
      }
      return userInfo
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const data = await getUserInfoApi()
      const userInfo = data

      const { roleCode = [] } = userInfo
      if (isArray(roleCode)) {
        this.setRoleList(roleCode)
      } else {
        userInfo.roleCode = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout(goLogin = true) {
      if (this.getToken) {
        try {
          await doLogout()
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      this.setRoleList([])
      goLogin && router.push(PageEnum.BASE_LOGIN)
    },
    /**
     * @description: 登出前确认
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      createConfirm({
        iconType: 'warning',
        title: () => h('span', '温馨提示'),
        content: () => h('span', '是否登出系统'),
        onOk: async () => {
          await this.logout(true)
        },
      })
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
