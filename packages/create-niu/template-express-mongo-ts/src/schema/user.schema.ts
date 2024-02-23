// user.schema.ts
// 接口参数校验 主要使用zod，具体使用可查看文档

import { object, string, TypeOf } from 'zod'

// 创建接口
export const createUserSchema = object({
  body: object({
    account: string({ required_error: '缺少账号名称' }).nonempty(),
    name: string({ required_error: '缺少用户姓名' }).nonempty(),
    password: string({ required_error: '缺少用户密码' }).min(
      6,
      '密码太短 - 至少6个字符'
    ),
    passwordConfirmation: string({ required_error: '缺少确认密码' }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: '两次密码不匹配',
    path: ['passwordConfirmation'],
  }),
})

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>
