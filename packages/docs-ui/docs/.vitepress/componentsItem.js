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

  // 获取文件第一行作为标题的函数
  const getFirstLineTitle = (filePath) => {
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      const firstLine = content.split('\n')[0].trim()
      // 移除Markdown标题符号#和首尾空格
      return firstLine.replace(/^#\s*/, '').trim()
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error)
      return ''
    }
  }

  // 文件夹
  const dirNames = files.filter((file) =>
    fs.statSync(path.resolve(componentsDir, file)).isDirectory()
  )

  // md 文件
  const fileNames = files
    .filter((file) => fs.statSync(path.resolve(componentsDir, file)).isFile())
    .map((file) => file.replace(/(.md)$/, ''))

  dirNames.forEach((file) => {
    const indexPath = path.resolve(componentsDir, file, 'index.md')
    const title = fs.existsSync(indexPath) ? getFirstLineTitle(indexPath) : file
    componetsItem.push({
      text: title || file,
      link: `/components/${file}/index`
    })
  })

  fileNames.forEach((file) => {
    const filePath = path.resolve(componentsDir, `${file}.md`)
    const title = fs.existsSync(filePath) ? getFirstLineTitle(filePath) : file
    componetsItem.push({
      text: title || file,
      link: `/components/${file}`
    })
  })

  return componetsItem
}
