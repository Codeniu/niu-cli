// user.controller.ts

import { Request, Response } from 'express'

import { CreateUserInput } from '../schema/user.schema'
import USER_CRUD from '../service/user.service'
import silentHandle from '../utils/silentHandle'
import commonRes from '../utils/commonRes'

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  const [e, user] = await silentHandle(USER_CRUD.create, req.body)

  return e ? commonRes.error(res, null, e.message) : commonRes(res, user)
}
