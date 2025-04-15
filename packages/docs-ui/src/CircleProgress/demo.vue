<template>
  <div class="demo-container">
    <!-- 基础用法 -->
    <div class="demo-item">
      <h3>基础用法</h3>
      <circle-progress :percentage="75" />
    </div>

    <!-- 自定义颜色和大小 -->
    <div class="demo-item">
      <h3>自定义样式</h3>

      <circle-progress
        :percentage="88"
        :size="150"
        color="#67c23a"
        :stroke-width="8"
        background-color="#f0f9eb"
      />
    </div>

    <!-- 不显示文字 -->
    <div class="demo-item">
      <h3>无文字</h3>
      <circle-progress :percentage="50" :show-text="false" />
    </div>

    <!-- 自定义文字样式 -->
    <div class="demo-item">
      <h3>自定义文字</h3>
      <circle-progress
        :percentage="95"
        text-color="#e6a23c"
        :text-size="24"
        color="#fdf6ec"
      />
    </div>

    <!-- 自定义进度条宽度 -->
    <div class="demo-item">
      <h3>自定义进度条宽度</h3>
      <circle-progress
        :percentage="60"
        :stroke-width="4"
        :progress-stroke-width="8"
        color="#ff9f43"
      />
    </div>
  </div>
</template>

<script>
import CircleProgress from './index.vue'

export default {
  name: 'CircleProgressDemo',
  components: {
    CircleProgress
  }
}
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.demo-item {
  text-align: center;
}

h3 {
  margin-bottom: 20px;
  color: #606266;
  font-size: 16px;
  font-weight: 500;
}
</style>
