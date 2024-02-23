// utils/crudProvider.ts

// 根据自己的需要增加

import {
  FilterQuery,
  UpdateQuery,
  DocumentDefinition,
  QueryOptions,
  Model,
  InsertManyOptions,
} from 'mongoose'

class BaseCrudProviderCls<document, Cdocument> {
  private DBModel: Model<any>

  constructor(DBModel: Model<any>) {
    this.DBModel = DBModel
  }

  async create(input: DocumentDefinition<Cdocument>) {
    const data = await this.DBModel.create(input)

    return data.toJSON()
  }

  async update(
    query: FilterQuery<document>,
    update: UpdateQuery<document>,
    options?: QueryOptions
  ) {
    return this.DBModel.updateOne(query, update, options)
  }

  async find(
    query: FilterQuery<document>,
    projection?: any,
    options?: QueryOptions
  ) {
    const result = await this.DBModel.find(query, projection, options)
    return result && result.map((d) => d.toJSON())
  }
}

const BaseCrudProvider = function <document, Cdocument>(DBModel: Model<any>) {
  const CRUD = new BaseCrudProviderCls<document, Cdocument>(DBModel)

  return {
    create: CRUD.create.bind(CRUD),
    update: CRUD.update.bind(CRUD),
    find: CRUD.find.bind(CRUD),
  }
}

export { BaseCrudProvider }
