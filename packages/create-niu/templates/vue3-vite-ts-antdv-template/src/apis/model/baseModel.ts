export interface BasicPageParams {
  offsetNumber: number // page
  offset: number // pageSize
}

export interface BasicFetchResult<T> {
  items: T[]
  total: number
}

export interface paginationParams {
  pageNum: number
  pageSize: number
}
