<template>
  <div class="first-panel">
    <Panel
      v-for="supply in suppliers"
      :key="supply.title"
      :title="supply.title"
      :subtitle="supply.subtitle"
      :icon="supply.icon"
      :num="supply.num"
      :dayCount="supply.dayCount"
      :monthCount="supply.monthCount"
      :dayFlag="supply.dayFlag"
      :monthFlag="supply.monthFlag"
    />
  </div>
</template>

<script lang="ts" setup>
  import Panel from '../components/panel/index.vue'

  const suppliers = [
    {
      title: '正在服务中的供应商',
      subtitle: '服务中',
      icon: 'zpgg',
      num: 123,
      dayCount: 23,
      monthCount: 100,
      dayFlag: 1,
      monthFlag: 1,
    },

    {
      title: '正在进行评价的供应商',
      subtitle: '评价中',
      icon: 'zpgg',
      num: 123,
      dayCount: 23,
      monthCount: 100,
      dayFlag: 1,
      monthFlag: 1,
    },

    {
      title: '已完成评价的供应商',
      subtitle: '已完成',
      icon: 'zpgg',
      num: 123,
      dayCount: 23,
      monthCount: 100,
      dayFlag: 1,
      monthFlag: 1,
    },
  ]
</script>

<style lang="less" scoped>
  .first-panel {
    display: flex;
    gap: 20px;
  }
</style>
