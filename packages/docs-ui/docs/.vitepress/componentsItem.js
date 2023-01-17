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

  // 文件夹
  const dirNames = files.filter((file) =>
    fs.statSync(path.resolve(componentsDir, file)).isDirectory()
  )

  // md 文件
  const fileNames = files
    .filter((file) => fs.statSync(path.resolve(componentsDir, file)).isFile())
    .map((file) => file.replace(/(.md)$/, ''))

  dirNames.forEach((file) => {
    componetsItem.push({
      text: file,
      link: `/components/${file}/index`
    })
  })

  fileNames.forEach((file) => {
    componetsItem.push({
      text: file,
      link: `/components/${file}`
    })
  })

  return componetsItem
}
