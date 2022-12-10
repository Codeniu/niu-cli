
# 前言

参考 vue-create 构建自己的脚手架。

## 痛点

日常开发中开启新项目的方式：复制粘贴，这种方式的缺点：

- 重复性劳动，繁琐且浪费时间
- 容易忽略项目中的配置设置
- `copy` 过来的模板会存有重复代码

## How

如果我们自己开发一套脚手架，自己定制自己的模板，复制粘贴的人工流程就会转换为 `cli` 的自动化流程, 还可以通过维护不同的模板以适应不同业务需求。

主要为了达成以下目的：

- 快速搭建新的项目
- 帮助团队成员遵循一致的开发流程

脚手架将具备的功能：

- 交互式命令
- 模板选择
- 注入封装好的 request 模块
- 注入登录页面

# 规划脚手架架构

## 项目结构

参考 vue-create 的项目,使用 pnpm 进行项目管理。使用 pnpm-workspace 搭建 monorepo 环境。

**新建项目并初始化：**

```js
pnpm init
```

## 配置文件

**创建 .npmrc 文件并输入以下内容：**

.npmrc 文件是 npm 包管理工具的配置文件，用来存储 npm 的配置信息。

```
hoist-pattern[]=*eslint*
hoist-pattern[]=*babel*
hoist-pattern[]=@emotion/*
hoist-pattern[]=postcss
hoist-pattern[]=pug
hoist-pattern[]=source-map-support
hoist-pattern[]=ts-node
strict-peer-dependencies=false
auto-install-peers=false
```

各项配置的含义：

- `hoist-pattern` 表示将依赖包中满足某些条件的模块打包到一个文件中
- `strict-peer-dependencies` 表示如果一个包被安装到项目中，它的同级依赖包也必须被安装。
- `auto-install-peers` 表示当安装某个包时，自动安装该包的同级依赖包。

**配置 monorepo**

pnpm-workspace.yaml 文件中可以存储多个工作空间的配置信息，并且可以设置不同工作空间之间的依赖关系。

根目录下新建一个 `pnpm-workspace.yaml` 文件,并输入如下内容：

```js
packages: 
    - 'packages/**'
```

根目录创建 packages 文件夹，这是子项目的存在目录。

**配置 eslint**

```
pnpm add 
    eslint 
    eslint-define-config 
    eslint-plugin-import 
    eslint-plugin-node 
    eslint-plugin-regexp 
    --save-dev -w 
```

`-w` 表示在根目录安装

**配置 prettier**

```
pnpm add prettier --save-dev -w 
```

**配置 typescript**

```
pnpm add typescript --save-dev -w 
```

在 create-niu 文件夹创建 tsconfig.json 文件，并输入：

```json
{
  "include": ["src", "__tests__"],
  "compilerOptions": {
    "outDir": "dist",
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "Node",
    "strict": true,
    "declaration": false,
    "sourceMap": true,
    "noUnusedLocals": true,
    "esModuleInterop": true
  }
}
```

# 编写脚手架脚本

## 创建入口文件

在create-niu 目录下 新建文件 index.js

```js
#!/usr/bin/env node

console.log('hello niu')
```

`#!/usr/bin/env node`指定当前脚本的解释器为node

**指定可执行脚本的位置**

在 package.json 中添加下面代码：

```js
{
  "bin": {
    "create-niu": "index.js",
    "cnu": "index.js"
  },
}
```

`"bin"` 字段用来指定包中可执行文件的路径, 也就是说当我们的包上线后，执行命令 `npm create niu`，就会开始执行这个index文件。

**验证一下**

在在终端进入到create-niu目录下,执行:

```
npm link
```

然后在终端中执行：

```js
create-niu 
// or
cnu
```

不出意外的话可以看到控制台输出的信息了

**打包构建**

脚本使用TS编写，那么就需要构建工具将TS代码转换成JS。

工具：

- [rollup](https://www.npmjs.com/package/rollup) 打包构建工具。
- [unbuild](https://www.npmjs.com/package/unbuild) 是统一的JavaScript构建工具。

在项目根目录安装依赖：

```
pnpm add unbuild rollup --save-dev -w
```

进入到create-niu 文件夹下，创建build.config.ts，并输入以下配置：

```
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      minify: true
    }
  },
  alias: {
    // we can always use non-transpiled code since we support 14.18.0+
    prompts: 'prompts/lib/index.js'
  }
})

```

在 package.json 加入脚本：

```js
  "scripts": {
    "dev": "unbuild --stub",
    "build": "unbuild",
    "prepublishOnly": "npm run build"
  },
```

新建src目录，并添加 index.ts 文件，上述构建配置文件中指定的入口在此， `entries: ['src/index']`:

执行`pnpm run dev` 查看 dist 文件夹下已构建好的文件。

将create-niu 目录下的index.js修改为：

```js
#!/usr/bin/env node

import './dist/index.mjs'
```

此后在 `src/index.ts` 编写脚手架脚本

## 解析命令行参数

在命令行环境中，用户可以通过输入命令来执行程序。命令的格式一般是：`<command> [options] [arguments]`，其中，命令表示要执行的操作，选项（options）用于指定命令的行为或者配置信息，参数（arguments）表示命令要操作的数据。

例如，`grep -i "hello" file.txt` 是一个常见的命令，其中，`grep` 是命令，`-i` 是选项，表示忽略大小写，"hello" 是参数，表示要搜索的字符串，file.txt 是参数，表示要搜索的文件。

### 如何解析

**解析命令行参数的过程:**

- 程序从用户输入中读取命令行参数
- 分析它们的内容
- 获取命令、选项和参数的值

**command：**

- create-niu
- cnu 别名

**[options]:**

- -v 显示版本号
- -h 显示帮助信息
- --template 执行模板

**[arguments]：**

- projectName 项目名
- framework 框架
- language variety 语言变体

### 代码实现

安装 [minimist](https://www.npmjs.com/package/minimist), `minimist` 是一个常用的 Node.js 库，用于解析命令行参数。

```
pnpm -F create-niu  add minimist
```

`-F create-niu` 是指在create-niu包中安装依赖

在ts中添加如下代码：

```ts
import minimist from 'minimist'

const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), { string: ['_'] })

console.log('hello niu', argv)
```

在测试包中执行，结果如图：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c4c4c7e7cde48499fe41ccb8179ff89~tplv-k3u1fbpfcp-watermark.image?)

## 询问用户信息

[prompts](https://www.npmjs.com/package/prompts) 提供了一个简单易用的命令行提示库，可以让你快速构建交互式的命令行应用。

安装

```
pnpm -F create-niu  add prompts --save-dev

pnpm add @types/prompts --save-dev -w 
```

修改index.ts:

```js
  try {
    result = await prompts([
      {
        type: argTargetDir ? null : 'text',
        name: 'projectName',
        message: 'Project name:',
        initial: defaultTargetDir,
        onState: (state) => {
          targetDir = formatTargetDir(state.value) || defaultTargetDir
        }
      }
    ])
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  const { projectName } = result
  console.log(projectName)
```

npm link 后可以在控制台看到你输入项目名称了

## 写入模板

使用 `fs.copyFileSync` 同步地将一个文件复制到另一个文件或目录。`fs.copyFileSync` 是 `Node.js` 中的一个文件系统方法它会读取源文件的内容，并将其写入目标文件，完成复制操作。

与 create-niu 目录下创建模板文件夹 template-demo ,如图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f53094ab0f8c4e8f9b39cc3e1483bbb7~tplv-k3u1fbpfcp-watermark.image?)

修改脚本，拷贝模板的流程大致如下：

1. 设置模板存放路径
2. 便利模板文件夹中文件
3. 拷贝目录
4. 拷贝文件
5. 递归3，4步骤，完成文件拷贝工作

拷贝过程中需要特别处理 `package.json` 文件，因为要往里边写入包名。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25d9610d7a8e4d7d8a55193c8f8e5145~tplv-k3u1fbpfcp-watermark.image?" alt="" width="90%" />

## 美化交互信息

完成必要的工作之后发现交互信息不是很好看，可以给交互式提示信息添加各式颜色。

```
pnpm -F create-niu add kolorist --save-dev
```

修改脚本：

```js
import {
  blue,
  cyan,
  green,
  lightGreen,
  lightRed,
  magenta,
  red,
  reset,
  yellow
} from 'kolorist'


{
    type: 'select', //模板选择
    name: 'template',
    message: reset('select a framework'),
    choices: [
      { title: blue('project1'), value: 1 },
      { title: cyan('project2'), value: 2 }
    ]
}
```

效果

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26dc9ce93e244f21b1272bc0793f16d7~tplv-k3u1fbpfcp-watermark.image?)

# 发布脚手架

如果脚手架功能正常，可以将其发布到 npm 仓库中，以便其他人使用。可以运行如下命令来发布脚手架：

```
npm publish
```

 发布后，其他人就可以通过 npm 命令来安装和使用您的脚手架了
