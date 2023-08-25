import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import minimist from 'minimist'
import prompts from 'prompts'
import { blue, bold, cyan, lightGreen, red, reset } from 'kolorist'

const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), { string: ['_'] })

const cwd = process.cwd()

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore'
}

const defaultTargetDir = 'your-project-name'

async function init() {
  const argTargetDir = formatTargetDir(argv._[0])
  // const argTemplate = argv.template || argv.t

  let targetDir = argTargetDir || defaultTargetDir

  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir

  let result: prompts.Answers<'projectName' | 'overwrite' | 'template'>

  try {
    result = await prompts([
      {
        type: argTargetDir ? null : 'text',
        name: 'projectName',
        message: reset('项目名称:'),
        initial: defaultTargetDir,
        onState: (state) => {
          targetDir = formatTargetDir(state.value) || defaultTargetDir
        }
      },
      {
        type: () =>
          !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
        name: 'overwrite',
        message: () =>
          (targetDir === '.'
            ? 'Current directory'
            : `Target directory "${targetDir}"`) +
          ` is not empty. Remove existing files and continue?`
      },
      {
        type: 'select', //模板选择
        name: 'template',
        message: reset('选择项目模板:'),
        choices: [
          { title: blue('template-demo'), value: 'template-demo' },
          {
            title: blue('express-ts-mongo-template'),
            value: 'express-ts-mongo-template'
          },
          {
            title: blue('vue3-vite-ts-antdv-template'),
            value: 'vue3-vite-ts-antdv-template'
          }
        ]
      }
    ])
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  const { overwrite, template } = result

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  // 写入模板信息
  console.log(`\n\n🚀 正在创建项目: \n`)
  console.log(cyan(` ${root} ...`))

  // 模板地址
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '../../templates/',
    template
  )

  // console.log('模板地址', templateDir)

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  // 获取模板中文件的列表并写入
  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  function copy(src: string, dest: string) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
      copyDir(src, dest)
    } else {
      fs.copyFileSync(src, dest)
    }
  }

  function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true })
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file)
      const destFile = path.resolve(destDir, file)
      copy(srcFile, destFile)
    }
  }

  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8')
  )

  pkg.name = getProjectName()

  write('package.json', JSON.stringify(pkg, null, 2))

  console.log(`\n\n🆗 创建完成, 现在运行:\n`)
  console.log(bold(lightGreen(`  cd ${pkg.name}`)))
  console.log(bold(lightGreen(`  pnpm install`)))
  console.log(bold(lightGreen(`  pnpm start\n`)))
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

init().catch((e) => {
  console.log(red(`\n\n 安装中止`))
  console.error(red(e))
})
