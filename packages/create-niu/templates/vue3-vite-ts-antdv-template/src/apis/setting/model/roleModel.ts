export interface RoleItem {
  id: string
  roleName?: string
  roleCode?: string
  modulTypeDtos?: ModuleItem
}

type ModuleType = '1' | '2' | '3'

interface ModuleItem {
  id: string
  modulName: string
  modulPid?: string
  routePath: string
  type: ModuleType
}
