// src/routes/index.ts

import { Express, Request, Response, Router } from 'express'
import commonRes from '../utils/commonRes'
import silentHandle from '../utils/silentHandle'

import User from './user.routes'

const routerConf: Array<RouterConf> = [{ path: '/user', router: User }]

// 路由配置接口
interface RouterConf {
  path: string
  router: Router
  meta?: any
}

function routes(app: Express) {
  // 根目录
  app.get('/', (req: Request, res: Response) =>
    res.status(200).send('Hello Shinp!!!')
  )

  // app.get(
  //   '/hello',
  //   (req: Request, res: Response) => commonRes(res, { word: 'Hello Shinp!!!' }) // 成功
  // )

  // const getInfo = function () {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       Math.random() > 0.5 ? resolve('info...') : reject('error...')
  //     }, 500)
  //   })
  // }

  // app.get('/slient', async (req: Request, res: Response) => {
  //   const [e, result] = await silentHandle(getInfo)
  //   e ? commonRes.error(res, null) : commonRes(res, { result })
  // })

  routerConf.forEach((conf) => app.use(conf.path, conf.router))
}

export default routes
