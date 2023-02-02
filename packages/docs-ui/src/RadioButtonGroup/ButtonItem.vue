<template>
  <div
    class="niu-button"
    :class="{ 'niu-button__actived': actived, shake: actived }"
    @click="handleSelect"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    actived: {
      type: Boolean,
      default: false,
    },

    info: {
      type: Object,
      default: () => {},
    },
  })

  const emits = defineEmits(['change'])

  function handleSelect() {
    emits('change', props.info)
  }
</script>

<style lang="less" scoped>
  .niu-button {
    display: inline-block;
    padding: 4px 10px;
    color: #666;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    cursor: pointer;

    &__actived {
      background-color: #10a0e9;
      color: #fff;
      border: none;
    }
  }

  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
