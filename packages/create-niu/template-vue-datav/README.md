# 大屏项目模板

## 目录说明

### `packages/core`

核心组件库：

- echarts
- scale
- screen （如需调整标题背景图或者页面背景图、复制该组件到具体的项目中）

功能组件库：

- swiper 无缝滚动
- BasicDivider 分割线
- SvgIcon svg图标
- card 图表面板（根据项目需求调整）
- dance-number 滚动数字

## 项目

- demo 示例项目

## 创建新项目

复制 demo，更改为你自己的项目名称。

或者通过如下步骤创建：

在projects文件夹下新建文件夹 `project-name`,执行如下命令：

``` shell
npm init -y && npm pkg set type="module"

```

终端进入到 project-name 下：

```shell
pnpm add -g pnpm
```

从demo中复制项目的基本配置到新创建的项目中即可
