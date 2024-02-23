import { isObject, isString } from '/@/utils/is'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {}
  }
  const now = new Date().getTime()
  if (restful) {
    return `?_t=${now}`
  }
  return { _t: now }
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return
  }

  for (const key in params) {
    const format = params[key]?.format ?? null
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT)
    }
    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (error: any) {
          throw new Error(error)
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key])
    }
  }
}

/**
 * @description: 格式化请求参数,去掉空值
 */
export function formatRequestData(data: Recordable) {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    return
  }
  const result: any = {}
  Object.keys(data).forEach((key: any) => {
    if (isString(key)) {
      const value = data[key]
      if (value) {
        result[key] = value
      }
    }
    if (isObject(data[key])) {
      formatRequestDate(data[key])
    }
  })
  return result
}

export function objectToFormData(object: any) {
  const formData = new FormData()
  if (object) {
    Object.keys(object).forEach((key) => {
      const value = object![key]
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item)
        })
        return
      }

      formData.append(key, object![key])
    })
  }
  return formData
}
