<template>
  <div class="basictitle">
    <div class="bg"></div>
    <span class="basictitle-title">{{ title }}</span>
    <span class="basictitle-subtitle">{{ subtitle }}</span>
  </div>
</template>

<script lang="ts">
defineComponent({
  name: 'BasicTitle'
})
</script>
<script lang="ts" setup>
import { defineComponent } from 'vue'
defineProps({
  title: String,
  subtitle: String
})
</script>

<style lang="less" scoped>
.basictitle {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &-title {
    padding: 2px 10px;
    font-size: 18px;
    font-weight: bold;
    color: #666;
    margin-bottom: 6px;
    z-index: 2;
    background-color: inherit;
  }

  &-subtitle {
    display: inline-block;
    padding: 0 8px;
    height: 21px;
    line-height: 21px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    background: #11d88a;
    z-index: 2;
  }
}

.bg {
  position: absolute;
  width: 200px;
  height: 36px;
  border: 1px solid #c3c3c3ff;
}
</style>
