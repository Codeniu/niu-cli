<template>
  <div class="niu-step niu-step-right">
    <div v-if="headerDot" class="niu-step-headerDot"></div>
    <div class="niu-step-container">
      <div class="niu-step-tail"></div>
      <div class="niu-step-icon">
        <span v-if="icon">{{ icon }}</span>

        <slot v-else name="icon"><span>⏱️</span></slot>
      </div>
      <div class="niu-step-content">
        <div class="niu-step-title">
          <span v-if="title">
            {{ title }}
          </span>
          <slot v-else name="title" />
        </div>
        <div class="niu-step-description">
          <span v-if="description">{{ description }}</span>
          <slot v-else name="description" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="NStep">
defineProps({
  title: String,
  description: String,
  icon: String,
  headerDot: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.niu-step {
  padding-left: 50%;

  &-container {
    position: relative;
  }

  &-headerDot {
    position: relative;
    margin-left: 18px;
    padding: 20px 0 6px;
    width: 2px;
    height: 100%;
    background-color: #ccc;

    &::before {
      content: '';
      position: absolute;
      top: -10px;
      left: -4px;
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ccc;
    }
  }
  &-tail {
    position: absolute;
    top: 0;
    left: 18px;
    padding: 36px 0 6px;
    width: 2px;
    height: 100%;

    &::after {
      content: '';
      display: inline-block;
      width: 2px;
      height: 100%;
      background-color: #ccc;
    }
  }

  &-icon {
    float: left;
    margin-right: 16px;

    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    text-align: center;
    // background-color: #ccc;

    span {
      font-size: 30px;
    }
  }
  &-content {
    display: block;
    min-height: 48px;
    overflow: hidden;
  }
  &-title {
    padding-right: 12px;
    line-height: 24px;
    font-size: 14px;
    color: #000000d9;
  }
  &-description {
    padding-bottom: 12px;
    font-size: 14px;
    color: #00000073;
  }
}
</style>
