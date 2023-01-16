<template>
  <div :class="['n-divider', `${hiddenPreset ? '' : 'text-preset'}`]">
    <div
      v-if="$slots.default"
      :class="['n-divider-inner-text', `is-${contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentPosition: {
      type: String,
      default: 'left',
      validator(val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1
      }
    },
    hiddenPreset: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.n-divider {
  display: block;
  height: 1px;
  width: 100%;
  margin: 24px 0;
  background-color: rgba(0, 0, 0, 0.85);
  position: relative;
  &-inner-text {
    position: absolute;
    display: inline-block;
    padding: 0 20px;
    background-color: #fff;
  }
}
.is-left {
  transform: translateY(-50%);
}
.is-right {
  right: 20px;
  transform: translateY(-50%);
}
.is-center {
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.text-preset {
  &::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 1em;
    transform: translateY(-50%);
    background-color: #1890ff;
  }
}
</style>
