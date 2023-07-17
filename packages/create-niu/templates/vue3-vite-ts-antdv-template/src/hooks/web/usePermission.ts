import { toRaw } from 'vue'
import { RoleEnum } from '/@/enums/roleEnum'
import { useUserStoreWithOut } from '/@/store/modules/user'

export function usePermission() {
  const userStore = useUserStoreWithOut()
  const userInfo = toRaw(userStore.getUserInfo)

  const userMajorCode = userInfo.majorCode
  const userOrgId = userInfo.orgId
  const roles = toRaw(userStore.getRoleList) || []

  const isZGH = roles.some((item: string) => item === RoleEnum.ZGH)
  const isDWGH = roles.some((item: string) => item === RoleEnum.DWGH)
  const isZYZ = roles.some((item: string) => item === RoleEnum.ZYZ)
  const isGZS = roles.some((item: string) => item === RoleEnum.GZS)

  const isZYZOrGZS = isZYZ || isGZS
  const isZGHOrDWGH = isZGH || isDWGH
  const isZGHOrZYZ = isZGH || isZYZ

  return {
    roles,
    userMajorCode,
    isZGH,
    isDWGH,
    isZYZ,
    isGZS,
    isZYZOrGZS,
    isZGHOrDWGH,
    isZGHOrZYZ,
    userOrgId,
  }
}
