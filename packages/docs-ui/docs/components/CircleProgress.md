# CircleProgress 环形进度条

更新日期：2023-05-10

环形进度条组件，用于展示进度信息。

## 基础用法

```vue
<template>
  <CircleProgress :percentage="75" />
</template>

<!-- 自定义样式 -->
<circle-progress
  :percentage="88"
  :size="150"
  color="#67c23a"
  :stroke-width="8"
  background-color="#f0f9eb"
/>

<!-- 自定义进度条宽度 -->
<circle-progress
  :percentage="60"
  :stroke-width="4"
  :progress-stroke-width="12"
  color="#ff9f43"
/>
```

### example

<Wrap>
  <CircleProgressDemo />
</Wrap>

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percentage | 百分比，范围0-100 | number | 0 |
| size | 圆环大小（宽度和高度） | number | 120 |
| strokeWidth | 圆环背景线条宽度 | number | 6 |
| progressStrokeWidth | 进度条线条宽度 | number | 6 |
| color | 进度条颜色 | string | #409eff |
| backgroundColor | 进度条背景色 | string | #e5e9f2 |
| showText | 是否显示进度文字 | boolean | true |
| textColor | 进度文字颜色 | string | #606266 |
| textSize | 进度文字大小 | number | 20 |

### 示例

```vue
<template>
  <div class="demo-circle">
    <CircleProgress
      :percentage="75"
      :size="100"
      :stroke-width="4"
      :progress-stroke-width="8"
      color="#67c23a"
      text-color="#67c23a"
    />
  </div>
</template>

<style scoped>
.demo-circle {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
```

## 源码
<CodeGroup>
  <CodeGroupItem title="Vue" active>

  @[code](../../../src/components/CircleProgress/index.vue)

  </CodeGroupItem>
</CodeGroup>

<details>
  <summary>查看代码</summary>

  ```vue
  <template>
    <div
      class="circle-progress"
      :style="{ width: size + 'px', height: size + 'px' }"
      >
        <svg :width="size" :height="size" viewBox="0 0 100 100">
          <!-- 底层圆环 -->
          <circle
            cx="50"
            cy="50"
            :r="radius"
            :stroke="backgroundColor"
            :stroke-width="strokeWidth"
            fill="none"
          />
          <!-- 进度圆环 -->
          <circle
            cx="50"
            cy="50"
            :r="radius"
            :stroke="color"
            :stroke-width="progressStrokeWidth"
            fill="none"
            :style="circleStyle"
            transform="rotate(-90 50 50)"
          />
          <!-- 中间文字 -->
          <text
            v-if="showText"
            x="50"
            y="50"
            text-anchor="middle"
            dominant-baseline="middle"
            :fill="textColor"
            :font-size="textSize"
          >
            {{ percentage }}%
          </text>
        </svg>
    </div>
  </template>

  <script>
  export default {
    name: 'CircleProgress',
    props: {
      percentage: {
        type: Number,
        default: 0,
        validator: (val) => val >= 0 && val <= 100
      },
      size: {
        type: Number,
        default: 120
      },
      strokeWidth: {
        type: Number,
        default: 6
      },
      progressStrokeWidth: {
        type: Number,
        default: 6
      },
      color: {
        type: String,
        default: '#409eff'
      },
      backgroundColor: {
        type: String,
        default: '#e5e9f2'
      },
      showText: {
        type: Boolean,
        default: true
      },
      textColor: {
        type: String,
        default: '#606266'
      },
      textSize: {
        type: Number,
        default: 20
      }
    },
    computed: {
      radius() {
        const maxStrokeWidth = Math.max(
          this.strokeWidth,
          this.progressStrokeWidth
        )
        return 50 - maxStrokeWidth / 2
      },
      circleStyle() {
        const perimeter = 2 * Math.PI * this.radius
        const dashOffset = perimeter * (1 - this.percentage / 100)
        return {
          strokeDasharray: `${perimeter}px ${perimeter}px`,
          strokeDashoffset: `${dashOffset}px`,
          transition: 'stroke-dashoffset 0.6s ease'
        }
      }
    }
  }
  </script>

  <style scoped>
  .circle-progress {
    position: relative;
    display: inline-block;
  }
  </style>

  ```
</details>