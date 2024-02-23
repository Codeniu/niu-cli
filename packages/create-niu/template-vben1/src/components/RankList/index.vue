<template>
  <div class="list" v-for="(list, i) in arrList" :key="i">
    <a-row>
      <a-col :span="3">
        <div class="list-index" :class="i < 3 ? 'active_index' : ''">{{ i + 1 }}</div>
      </a-col>
      <a-col :span="18">
        <div class="list-name">{{ list.orgName }}</div>
      </a-col>
      <a-col :span="3">
        <div class="list-count">{{ list.count }}</div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  type Item = {
    orgName: string
    count: string | number
  }

  defineProps({
    arrList: {
      type: Array<Item>,
      default: () => [],
    },
  })
</script>
<style lang="less" scoped>
  .list {
    padding: 0 5px;

    &-index {
      text-align: center;
      width: 18px;
      height: 18px;
    }

    &-name {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }

    &-count {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
  }
</style>
