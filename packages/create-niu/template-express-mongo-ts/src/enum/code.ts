// 枚举状态码 根据自己需要定义
enum Code {
  success = 3000,
  denied,
  error,
}

enum CodeMessage {
  success = '请求成功',
  denied = '无权限',
  error = '系统异常',
}

// 状态类型 只能是Code中所枚举的状态
type codeType = keyof typeof Code

export { Code, codeType, CodeMessage }
