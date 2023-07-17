<template>
  <div>
    <div class="card relative" @contextmenu="handleContext($event)"> 右键菜单 </div>
  </div>
</template>

<script lang="ts" setup>
  import { h } from 'vue'
  import { useContextMenu } from '/@/hooks/web/useContextMenu'
  import { useMessage } from '/@/hooks/web/useMessage'

  const [createContextMenu] = useContextMenu()
  const { createMessage, createConfirm } = useMessage()

  function handleContext(e: MouseEvent) {
    const arr = [
      {
        label: '审核',
        icon: '',
        handler: () => {
          console.log('审核')
        },
      },
      {
        label: '删除',
        icon: '',
        handler: async () => {
          createConfirm({
            iconType: 'warning',
            title: () => h('span', '提示'),
            content: () => h('span', '确认删除？'),
            onOk: async () => {
              createMessage.success('删除成功')
            },
          })
        },
      },
      {
        label: '预览',
        icon: '',
        handler: () => {
          console.log('预览')
        },
      },
    ]

    createContextMenu({
      event: e,
      styles: {
        'box-shadow': '0 2px 8px rgb(0 0 0 / 15%)',
      },
      items: arr,
    })
  }
</script>

<style lang="less" scoped>
  .card {
    display: flex;
    width: 378px;
    height: 132px;
    padding: 14px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    background: #fff;
  }
</style>
