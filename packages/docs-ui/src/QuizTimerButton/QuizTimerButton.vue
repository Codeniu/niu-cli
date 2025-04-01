<template>
  <div class="circle-countdown">
    <div class="progress-container">
      <svg class="progress-ring" width="42" height="42">
        <circle
          class="progress-ring-bg"
          cx="21"
          cy="21"
          r="18"
          :stroke-dasharray="strokeDasharray"
          stroke-dashoffset="-9"
        />
        <circle
          class="progress-ring-value"
          cx="21"
          cy="21"
          r="18"
          :stroke-dasharray="progressArray"
          stroke-dashoffset="-9"
        />
      </svg>
      <div class="countdown-text">{{ countdown }}</div>
    </div>

    <button
      class="action-button"
      :disabled="countdown > 0"
      @click="handleStart"
    >
      开始答题
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'

const props = defineProps({
  initialTime: {
    type: Number,
    default: 24
  },
  autoStart: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['start'])

// 缺口
const stroke = reactive({
  start: 80,
  end: 113
})
const strokeDasharray = `${stroke.start} ${stroke.end}`

const countdown = ref(props.initialTime)
const progressArray = computed(() => {
  const progress =
    ((props.initialTime - countdown.value) / props.initialTime) * stroke.start
  return `${progress} ${stroke.end}`
})

let timer: ReturnType<typeof setInterval> | null = null
const isPaused = ref(false)

// 开始倒计时
const startCountdown = () => {
  if (timer) return

  isPaused.value = false
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      stopCountdown()
    }
  }, 1000)
}

// 暂停倒计时
const pauseCountdown = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
    isPaused.value = true
  }
}

// 停止倒计时
const stopCountdown = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  isPaused.value = false
}

// 重置倒计时
const resetCountdown = () => {
  stopCountdown()
  countdown.value = props.initialTime
}

// 重新开始倒计时
const restartCountdown = () => {
  resetCountdown()
  startCountdown()
}

const handleStart = () => {
  emit('start')
}

onMounted(() => {
  if (props.autoStart) {
    startCountdown()
  }
})

onUnmounted(() => {
  stopCountdown()
})

// 暴露方法供父组件调用
defineExpose({
  startCountdown,
  pauseCountdown,
  stopCountdown,
  resetCountdown,
  restartCountdown,
  isPaused
})
</script>

<style scoped>
.circle-countdown {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 120px;
}

.progress-container {
  position: relative;
  width: 42px;
  height: 42px;
}

.countdown-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-weight: 500;
  color: #1890ff;
}

.progress-ring {
  transform: rotate(114deg);
  background-color: #92e4ff;
  border-radius: 50%;
}

.progress-ring circle {
  fill: none;
  stroke-width: 4;
  transition: stroke-dasharray 0.3s ease;
}

.progress-ring-bg {
  stroke: #92e4ff;
}

.progress-ring-value {
  stroke: #1890ff;
}

.action-button {
  position: absolute;
  bottom: -18px;
  padding: 2px 14px;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: #1890ff;
}

.action-button:disabled {
  color: #999;
  cursor: not-allowed;
  background-color: #92e4ff;
}

.action-button:focus {
  outline: none;
}
</style>
