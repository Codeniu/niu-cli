import { TOKEN_KEY } from '/@/enums/cacheEnum'

export function getToken(): string {
  return getAuthCache(TOKEN_KEY)
}

export function setToken(token: string) {
  return setAuthCache(TOKEN_KEY, `inno-${token}`)
}

export function getAuthCache(key: string): string {
  return window.sessionStorage.getItem(key) || ''
}

export function setAuthCache(key: string, value: string) {
  return window.sessionStorage.setItem(key, value)
}
