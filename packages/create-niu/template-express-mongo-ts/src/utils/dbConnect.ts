// 连接db

import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

async function dbConnect() {
  const dbUri = config.get<string>('dbUri')
  const dbUser = config.get<string>('dbUser')
  const dbPassword = config.get<string>('dbPassword')
  const dbAuthSource = config.get<string>('dbAuthSource')

  try {
    const connection = await mongoose.connect(dbUri, {
      user: dbUser,
      pass: dbPassword,
      authSource: dbAuthSource,
    })

    logger.info('DB connected')

    return connection
  } catch (error) {
    logger.error('Could not connect to db')
    process.exit(1)
  }
}

export default dbConnect
