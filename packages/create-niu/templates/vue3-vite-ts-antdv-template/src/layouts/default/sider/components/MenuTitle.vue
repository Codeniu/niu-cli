<template>
  <SvgIcon v-if="icon" :name="icon" />
  <span style="padding: 0 5px">
    {{ title }}
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import SvgIcon from '/@/components/SvgIcon.vue'

  export default defineComponent({
    components: { SvgIcon },
    props: {
      icon: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        required: true,
      },
    },
    setup() {
      return {}
    },
  })
</script>
<style lang="less" scoped></style>
