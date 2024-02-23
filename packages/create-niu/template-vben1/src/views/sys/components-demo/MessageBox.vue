<template>
  <div>
    <ul>
      <li> createMessage </li>
      <li> createConfirm </li>
    </ul>
    <a-button @click="handleDelete"> 删除 </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { h } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage, createConfirm } = useMessage()

  const handleDelete = () => {
    createConfirm({
      iconType: 'warning',
      title: () => h('span', '提示'),
      content: () => h('span', '确认删除？'),
      onOk: async () => {
        createMessage.success('删除成功')
      },
    })
  }
</script>

<style lang="less" scoped></style>
