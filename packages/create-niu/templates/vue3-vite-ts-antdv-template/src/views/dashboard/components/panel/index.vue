<template>
  <div class="item">
    <span class="item_top">{{ title }}</span>
    <div class="item_center">
      <span class="item_center-subtitle">
        <svg-icon :name="icon" prefix="icon" size="40px" />
        {{ subtitle }}
      </span>
      <span class="item_center-count"> {{ num }} </span>
    </div>
    <a-divider style="margin: 0" />
    <div class="item_bottom">
      <div class="item_bottom-day">
        <div> 日新增 {{ dayCount }} </div>
        <div>
          <svg-icon :name="dayFlag == 0 ? 'up' : 'down'" />
        </div>
      </div>
      <div class="item_bottom-month">
        <div>月新增 {{ monthCount }}</div>
        <div>
          <svg-icon :name="monthFlag == 0 ? 'up' : 'down'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import SvgIcon from '/@/components/SvgIcon.vue'

  defineProps({
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    num: {
      type: [String, Number],
      default: '0',
    },
    dayCount: {
      type: [String, Number],
      default: '0',
    },
    monthCount: {
      type: [String, Number],
      default: '0',
    },
    dayFlag: {
      type: [String, Number],
      default: '0',
    },
    monthFlag: {
      type: [String, Number],
      default: '0',
    },
  })
</script>
<style lang="less" scoped>
  .item {
    width: 100%;
    background-color: #fff;
    border-radius: 2px;
    padding: 10px 20px;

    &_top {
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
    }

    &_center {
      display: flex;
      margin-top: 10px;
      margin-bottom: 10px;
      justify-content: space-between;

      &-subtitle {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.65);
      }

      &-count {
        font-size: 30px;
        line-height: 38px;
        color: rgba(0, 0, 0, 0.85);
      }
    }

    &_bottom {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.65);

      &-day,
      &-month {
        display: flex;
      }
    }
  }
</style>
