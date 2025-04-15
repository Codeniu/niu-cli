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
