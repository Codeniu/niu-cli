<template>
  <div class="wrap">
    <span class="tag">example</span>
    <slot />
  </div>
</template>

<script lang="ts" setup>
// 包裹
</script>

<style lang="less" scoped>
.wrap {
  margin: 20px 0;
  position: relative;
  border: 1px solid #99999930;
  border-radius: 10px;
  padding: 10px;

  .tag {
    position: absolute;
    top: -14px;
    left: 10px;
    padding: 2px 4px;
    font-size: 12px;
    color: #42b883;
    background-color: #fff;
  }
}
</style>
