<template>
  <div class="second-card">
    <div class="card-top">
      <div class="top-title">
        {{ title }}
      </div>
      <div class="top-btn">
        <a-button @click="handleViewAll" type="link">查看全部</a-button>
      </div>
    </div>
    <div class="card-content">
      <div class="content-icon">
        <SvgIcon name="zpgg" size="48" />
        <span>
          <span class="content-number">{{ count }}</span>
          <span class="content-unit">条</span>
        </span>
      </div>
      <div class="card-list">
        <CardList v-bind="$attrs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import SvgIcon from '/@/components/SvgIcon.vue'
  import CardList from './CardList.vue'

  defineProps({
    title: String,
    count: [String, Number],
  })

  const handleViewAll = () => {
    console.log('view all')
  }
</script>

<style lang="less" scoped>
  .second-card {
    padding: 12px;
    background-color: #fff;
  }
  .card-top {
    display: flex;
    justify-content: space-between;
  }

  .top-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }

  .card-content {
    height: 150px;
    display: flex;
    align-items: center;
  }

  .content-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .content-number {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.85);
  }

  .content-unit {
    margin-left: 6px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .content-icon {
    width: 140px;
  }
</style>
