<template>
  <div>
    <RadioButtonGroup
      v-model="formState.major"
      :options="[
        {
          label: '上海',
          value: 'zs'
        },
        {
          label: '北京',
          value: 'bj'
        },
        {
          label: '深圳',
          value: 'dl'
        }
      ]"
    />

    <div class="show">
      <span>v-model: </span>
      <span>{{ formState.major }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import RadioButtonGroup from './index.vue'

const formState = reactive({
  major: 'zs'
})
</script>

<style lang="less" scoped>
.show {
  span:first-child {
    font-weight: bold;
  }
  span:last-child {
    color: green;
  }
}
</style>
