<template>
  <div
    class="stone-title-wrap"
    :class="{ wrapReserve: contentPosition === 'left' }"
  >
    <div
      class="stone-title-time"
      :class="{ leftTime: contentPosition === 'left' }"
      :style="timeBackgroundStyle"
    >
      {{ info.time }}
    </div>
    <div class="stone-title-type">{{ info.typeName }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {
        time: '',
        typeName: '',
        color: '#ccc'
      }
    }
  },
  contentPosition: {
    type: String,
    default: 'right'
  }
})

const timeBackgroundStyle = computed(() => {
  return {
    backgroundColor: props.info.color
  }
})
</script>

<style lang="less" scoped>
.stone-title-wrap {
  display: flex;
  justify-content: space-between;
}

.wrapReserve {
  flex-direction: row-reverse;
}

.stone-title-time {
  color: #fff;
  padding: 2px 10px;
  border-radius: 60px 50px 50px 0;
  background-color: red;
}

.leftTime {
  border-radius: 50px 60px 0 50px;
}

.stone-title-type {
  color: #999;
  border: 1px dashed #ccc;
  background-color: #fff;
  border-radius: 20px;
  padding: 2px 10px;
}
</style>
