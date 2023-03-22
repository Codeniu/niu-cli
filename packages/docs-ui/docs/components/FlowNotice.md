# 可拖拽容器

## Example

拖动miumiu

<Wrap>
  <FlowNotice />
</Wrap>

## Code

```vue
<template>
  <div
    :style="{
      width: '100%',
      height: '300px',
      position: 'relative'
    }"
  >
    <FlowNotice>
      <span> miumiu </span>
    </FlowNotice>
  </div>
</template>

<script lang="ts" setup>
import FlowNotice from './index.vue'
</script>

<style lang="less" scoped></style>

```

## API

props的各个属性:

| Props | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| boxWidth | Number | 240 | 盒子元素的宽度。 |
| boxHeight | Number | 160 | 盒子元素的高度。 |
| boxLeft | Number | 1 | 盒子元素相对于容器左侧的位置。 |
| boxTop | Number | 1 | 盒子元素相对于容器顶部的位置。 |
| maxWidth | Number | 600 | 容器允许的最大宽度。 |
| maxHeight | Number | 300 | 容器允许的最大高度。 |
