<template>
  <div class="second-container">
    <Card title="变更预警" :list="list1" :count="list1.length" />
    <Card title="风险" :list="list2" :count="list2.length" />
  </div>
</template>

<script lang="ts" setup>
  import Card from './Card.vue'

  const list1 = [
    {
      id: 1,
      type: '法人变更',
      company: 'XX物业管理有限责任公司',
    },

    {
      id: 2,
      type: '经营风险',
      company: 'INTERCRUISES公司',
    },

    {
      id: 3,
      type: '监事变更',
      company: 'XX管理咨询有限公司',
    },

    {
      id: 4,
      type: '司法风险',
      company: 'XX管理咨询有限公司',
    },

    {
      id: 5,
      type: '司法风险',
      company: 'XX管理咨询有限公司',
    },
  ]

  const list2 = [
    {
      id: 1,
      type: '法人变更',
      company: 'XX物业管理有限责任公司',
    },
    {
      id: 2,
      type: '经营风险',
      company: 'INTERCRUISES公司',
    },

    {
      id: 3,
      type: '监事变更',
      company: 'XX管理咨询有限公司',
    },
    {
      id: 6,
      type: '司法风险',
      company: 'XX管理咨询有限公司',
    },
  ]
</script>

<style lang="less" scoped>
  .second-container {
    height: 100%;
    display: flex;
    gap: 20px;

    div {
      flex: 1;
    }
  }
</style>
