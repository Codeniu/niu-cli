import { BasicPageParams } from '../../model/baseModel'

export type listParams = BasicPageParams & {
  name?: string // key or value 名称
  searchValue?: string
  state?: string
}
