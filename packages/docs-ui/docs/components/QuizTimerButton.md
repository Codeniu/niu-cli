# 倒计时按钮组件

一个带有圆形进度条的倒计时按钮，常用于答题等需要等待一定时间后才能操作的场景。

## Example

<Wrap>
  <QuizTimerButton />
</Wrap>

```vue
<template>
  <QuizTimerButton />
</template>
```
## 功能特点

- 圆形进度条显示倒计时进度
- 可配置初始倒计时时间
- 支持自动开始倒计时
- 提供完整的控制方法（开始、暂停、停止、重置、重新开始）
- 倒计时结束后按钮可点击

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| initialTime | 初始倒计时时间（秒） | Number | 10 |
| autoStart | 是否自动开始倒计时 | Boolean | true |

## Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| start | 点击开始按钮时触发 | - |

## Methods

| 方法名 | 说明 |
|------|------|
| startCountdown | 开始倒计时 |
| pauseCountdown | 暂停倒计时 |
| stopCountdown | 停止倒计时 |
| resetCountdown | 重置倒计时 |
| restartCountdown | 重新开始倒计时 |

## 源码
<details>
  <summary>查看代码</summary>

```vue
<template>
  <div class="countdown-container">
    <div class="countdown-content">
      <div class="progress-wrapper">
        <circle-progress
          :percent="progressPercent"
          :size="42"
          :border-width="4"
          :border-bg-width="4"
          :show-percent="false"
          border-color="#1890ff"
          border-bg-color="#f0f0f0"
        >
        </circle-progress>
        <div class="countdown-inner">
          <span class="countdown-number">{{ countdown }}</span>
        </div>
      </div>
      <span class="countdown-unit">秒后可答题</span>
      <button
        class="start-button"
        :disabled="countdown > 0"
        @click="handleStart"
      >
        开始答题
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import CircleProgress from 'vue3-circle-progress'

const props = defineProps({
  initialTime: {
    type: Number,
    default: 10,
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
})

// ... 其余代码省略
</script>

<style scoped>
.countdown-container {
  position: relative;
  width: 100%;
  min-width: 300px;
  background: url('../assets/wave-bg.png') no-repeat center center;
  background-size: cover;
  border-radius: 8px;
}

// ... 其余样式省略
</style>
```

</details>