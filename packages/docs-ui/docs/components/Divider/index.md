# Divider [![NPM](https://img.shields.io/npm/l/@codeniu/vue-divider)](https://www.npmjs.com/package/@codeniu/vue-divider) [![npm](https://img.shields.io/npm/v/@codeniu/vue-divider.svg)](https://www.npmjs.com/package/@codeniu/vue-divider) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> vue-divider is a dependency-free, lightweight vue component. This is a study project, You will learn how to build a npm package from this project. You can also learn some webpack configurations.

分割线组件

## Example

### simple example

<NDivider></NDivider>

```vue
<NDivider></NDivider>
```

### set text

<NDivider> This is a divider </NDivider>

```vue
<NDivider> This is a divider </NDivider>
```

<NDivider content-position="center"> text on center </NDivider>

```vue
<NDivider content-position="center"> text on center </NDivider>
```

<NDivider content-position="right"> text on right </NDivider>

```vue
<NDivider content-position="right"> text on right </NDivider>
```

### hidden-preset

<NDivider hidden-preset> text on left </NDivider>

```vue
<NDivider hidden-preset> text on left </NDivider>
```

## Use with npm

[Try the demo](https://codeniu.github.io/vue-divider/demo/)

How to use?

``` bash
npm install @codeniu@vue-divider
```

Example

``` vue
<template>
  <div>
    <niu-divider />
    <niu-divider>This is a divider</niu-divider>
  </div>
</template>

<script>
  import niuDivider from '@codeniu/vue-divider';
  export default {
    components: { niuDivider },
    data () {
      return { }
    }
  }
</script>
```

## Options

| Property          | Description  | type    | default |
| ----------------- | ------------ | ------- | ------- |
| contentp-position | 文字位置     | String  | left    |
| hidden-preset     | 隐藏头部标记 | Boolean | false   |

## Source Code

```vue
<template>
  <div :class="['n-divider', `${hiddenPreset ? '' : 'text-preset'}`]">
    <div
      v-if="$slots.default"
      :class="['n-divider-inner-text', `is-${contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentPosition: {
      type: String,
      default: 'left',
      validator(val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1
      }
    },
    hiddenPreset: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.n-divider {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  background-color: rgba(0, 0, 0, 0.85);
  position: relative;
  &-inner-text {
    position: absolute;
    display: inline-block;
    padding: 0 20px;
    background-color: #fff;
  }
}
.is-left {
  transform: translateY(-50%);
}
.is-right {
  right: 20px;
  transform: translateY(-50%);
}
.is-center {
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.text-preset {
  &::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 1em;
    transform: translateY(-50%);
    background-color: #1890ff;
  }
}
</style>

```

[查看npm包的发布教程](https://github.com/Codeniu/vue-divider/blob/main/docs/How-to-publish-your-first-npm-package.md)

[掘金教程](https://juejin.cn/post/7130989356700925983)