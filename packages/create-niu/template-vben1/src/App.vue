<template>
  <a-config-provider :locale="zh_CN">
    <RouterView />
  </a-config-provider>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

  export default defineComponent({
    setup() {
      return { zh_CN }
    },
  })
</script>
