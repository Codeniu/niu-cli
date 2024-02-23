import { Router } from 'express'
import { createUserHandler } from '../controller/user.controller'
import validate from '../middleware/validate'
import { createUserSchema } from '../schema/user.schema'

const router = Router()

// 需要校验接口参数的，加上校验中间件
router.post('/create', validate(createUserSchema), createUserHandler)

export default router
