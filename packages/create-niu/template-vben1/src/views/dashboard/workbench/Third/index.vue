<template>
  <div class="third-container">
    <div class="card-top">
      <div class="top-title"> 评价发布动态 </div>
      <div class="top-btn">
        <a-button @click="handleViewAll" type="link">查看全部</a-button>
      </div>
    </div>
    <div class="card-content">
      <ListItem v-for="dynamic in dynamics" :key="dynamic.id" :dynamic="dynamic" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { diffTime } from '/@/utils'
  import ListItem from './ListItem.vue'
  import { DynamicType } from '/@/apis/dashboard'

  const dynamics = ref([] as DynamicType[])

  onMounted(() => {
    getDynamics()
  })

  function getDynamics() {
    const list = [
      {
        id: 1,
        time: '2023-07-12 13:40:33',
        company: '北京诺华制药有限公司',
        socer: '12.2',
        errorNum: '123',
      },
    ]
    dynamics.value = list.map((v: DynamicType) => {
      return {
        ...v,
        timeFormat: diffTime(v.time),
      }
    })
  }

  const handleViewAll = () => {
    console.log('view all')
  }
</script>

<style lang="less" scoped>
  .third-container {
    padding: 12px;
    height: 100%;
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
</style>
