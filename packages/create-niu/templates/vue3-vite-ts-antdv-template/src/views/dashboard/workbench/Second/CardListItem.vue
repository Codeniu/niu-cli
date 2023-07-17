<template>
  <div class="cardListItem">
    <div class="type">
      <span class="type-name" :class="`type-name__${color}`">
        {{ type }}
      </span>
    </div>
    <div class="text-wrap">{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'

  type ColorType = 'default' | 'danger' | 'warning'

  defineProps({
    type: String,
    title: String,
    color: String as PropType<ColorType>,
  })
</script>

<style lang="less" scoped>
  .cardListItem {
    display: flex;
    gap: 4px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;

    .type {
      min-width: 90px;
      position: relative;
    }
    .type-name::before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      background-color: inherit;
      border-radius: 50%;
    }

    .type-name {
      margin-left: 14px;
      padding: 2px 8px;
      color: #fff;
      background-color: #4ecb73;
      border-radius: 4px;

      &__default {
        background-color: #4ecb73;
      }

      &__danger {
        background-color: #f2637b;
      }

      &__warning {
        background-color: #fbd437;
      }
    }
  }
</style>
