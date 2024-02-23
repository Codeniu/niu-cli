<template>
  <div class="thirdListItem">
    <span>{{ dynamic.time }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'
  import { DynamicType } from '/@/apis/dashboard'

  defineProps({
    dynamic: {
      type: Object as PropType<DynamicType>,
      default: () => {
        return {
          id: '',
          time: '',
          company: '',
          socer: '',
          errorNum: '',
        }
      },
    },
  })
</script>

<style lang="less" scoped>
  .thirdListItem {
  }
</style>
