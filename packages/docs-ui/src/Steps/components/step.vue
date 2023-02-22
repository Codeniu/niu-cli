<template>
  <template v-if="contentPosition === 'left'">
    <NStepLeft v-bind="$attrs">
      <!-- 将slot透传给NStepLeft -->
      <template
        v-for="(item, key, index) in $slots"
        :key="index"
        v-slot:[key]="slotScope"
      >
        <slot :name="key" v-bind="slotScope"></slot>
      </template>
    </NStepLeft>
  </template>
  <!-- 内容在右侧 -->
  <template v-else>
    <NStepRight v-bind="$attrs">
      <template
        v-for="(item, key, index) in $slots"
        :key="index"
        v-slot:[key]="slotScope"
      >
        <slot :name="key" v-bind="slotScope"></slot>
      </template>
    </NStepRight>
  </template>
</template>

<script lang="ts" setup>
import NStepLeft from './stepLeft.vue'
import NStepRight from './stepRight.vue'

defineProps({
  contentPosition: {
    type: String,
    default: 'right'
  }
})
</script>

<style lang="less" scoped></style>
