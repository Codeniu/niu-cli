# vue3-vite-ts-antdv-template

中后台项目模板

noed > 16.18.0

技术栈：

- Vue 3
- Typescript
- Vite

ui 库 :

- [antdv 3.x](https://3x.antdv.com/components/overview-cn/)
- [windcss](https://windicss.org/)

## 菜单样式

![](https://codeniu-picbed.oss-cn-hangzhou.aliyuncs.com/picbed/202307141551187.jpg)

## 打包

生产环境打包时注意：

1. views/login/QrCodeLogin.vue 扫码登陆配置需要注意

2. vditor CDN 地址： <http://127.0.0.1/static/vditor/>位置：src\components\Markdown\src\Markdown.vue

## 目录描述

```bash

- src
 -- apis       # 接口
 -- components # 组件
 -- design     # 存放公共样式文件
 -- enums      # 枚举
 -- hooks      # hooks 函数
 -- layout     # 布局
 -- router     # 路由
 -- store      # 存储
 -- utils      # 工具函数
 -- views      # 视图
- types

```

## 脚本描述

项目使用 `pnpm` 进行依赖的安装

```bash
npm install -g pnpm
```

各项脚本描述

```js
  "scripts": {
    // 安装依赖
    "bootstrap": "pnpm install",
    // 开发环境
    "dev": "vite",
    // 打包
    "build": "cross-env NODE_ENV=production vite build && esno ./build/script/postBuild.ts",
    // 阿里云环境 --mode staging
    "build:staging": "cross-env NODE_ENV=test vite build --mode staging && esno ./build/script/postBuild.ts",
    // 项目预览
    "preview": "vite preview",
    // 生成 CHANGELOG.md 文件
    "log": "conventional-changelog -p angular -i CHANGELOG.md -s",
    // 暂存文件格式检查
    "lint:lint-staged": "lint-staged",
    // husky 初始化
    "prepare": "husky install",
    // 清除 cache
    "clean:cache": "rimraf node_modules/.cache/ && rimraf node_modules/.vite",
    // 删除 node_modules
    "clean:lib": "rimraf node_modules",
    // 重新安装依赖并生成lock文件
    "reinstall": "rimraf yarn.lock && rimraf package.lock.json && rimraf node_modules && pnpm run bootstrap"
  },
```

## 提交规范

通常情况下提交信息要按照如下的格式：

```bash
#scope 是选填项; 多个 scopes 也是可以的 (可用的分割符有: "/", "\" 和 ",")
type(scope?): subject
```

examples:

冒号后边跟空格

```bash
chore: run tests on travis ci

fix(server): send cors headers

feat(blog): add comment section
```

Common types:

- feat：提交新功能
- fix：修复了 bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复 bug 也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
- build
- ci
- revert

## 开发工具

- [网格布局生成](https://grid.layoutit.com/)
- [图片压缩](https://tinypng.com/)
