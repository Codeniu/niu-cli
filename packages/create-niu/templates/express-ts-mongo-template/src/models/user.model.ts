// user.model.ts

import mongoose from 'mongoose'
import config from 'config'

// 模板接口
export interface UserDocument extends mongoose.Document {
  name: string
  account: string
  password: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

// 模板校验规则
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    account: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

// 唯一
userSchema.index({ account: 1, deletedAt: 1 }, { unique: true })

// 创建模板 执行之后会自动在mongodb中创建相应的模板
const UserModel = mongoose.model<UserDocument>('User', userSchema)

export default UserModel
