import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// 动态获取组件名称
export function getComponetnsItem() {
  const componetsItem = []

  const componentsDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../',
    `components`
  )
  const files = fs.readdirSync(componentsDir)
  console.log('files: ', files)

  files.forEach((file) => {
    componetsItem.push({
      text: file,
      link: `/components/${file}/index`
    })
  })

  return componetsItem
}
