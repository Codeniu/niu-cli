<template>
  <div class="rank">
    <a-row>
      <a-col :span="12" v-for="(m, index) in map" :key="index">
        <div class="rank_list" v-for="(item, i) in m" :key="i">
          <a-row>
            <a-col :span="3">
              <div v-if="index == 0" class="rank_list-index" :class="i < 3 ? 'active_index' : ''">
                {{ i + 1 }}
              </div>
              <div v-else class="rank_list-index">{{ i + 11 }}</div>
            </a-col>
            <a-col :span="18">
              <div class="rank_list-name">{{ item.orgName }}</div>
            </a-col>
            <a-col :span="3">
              <div class="rank_list-count">{{ item.count }}</div>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue'

  type Item = {
    orgName: string
    count: number | string
  }

  const props = defineProps({
    rankTopTenList: {
      type: Array<Item>,
      default: () => [],
    },
    rankLastTenList: {
      type: Array<Item>,
      default: () => [],
    },
  })
  const map = computed(() => {
    return {
      0: props.rankTopTenList,
      1: props.rankLastTenList,
    }
  })
</script>
<style lang="less" scoped>
  .rank {
    &_list {
      padding: 0 5px;

      &-index {
        text-align: center;
        width: 18px;
        height: 18px;
      }

      &-name {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 25px;
      }

      &-count {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        width: 18px;
        height: 18px;
        text-align: center;
      }
    }
  }
</style>
