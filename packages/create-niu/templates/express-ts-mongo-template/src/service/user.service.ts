// user.service.ts
// mongodb操作

import UserModel, { UserDocument } from '../models/user.model'
import { BaseCrudProvider } from '../utils/crudProvider'

const CRUD = BaseCrudProvider<UserDocument, Omit<UserDocument, 'createdAt'>>(
  UserModel
)

export default CRUD
