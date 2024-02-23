// 数据格式化
function listJoin(list: any[], separator = '、') {
  if (!list) return ''
  return list.join(separator)
}

export function useFormat() {
  return {
    listJoin,
  }
}
