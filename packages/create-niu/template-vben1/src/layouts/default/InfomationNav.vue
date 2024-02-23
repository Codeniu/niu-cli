<template>
  <div class="infomation-nav">
    <div class="infomation-nav__title">
      {{ title }}
    </div>
    <div class="infomation-nav__options">
      <!-- 使用 Teleport 将元素传递进来 -->
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'InfomationNav',

    setup() {
      const { currentRoute } = useRouter()

      const title = computed(() => {
        const route = currentRoute.value
        if (!route) {
          return '菜单'
        }
        return route.meta.title
      })

      return {
        title,
      }
    },
  })
</script>
<style lang="less" scoped>
  .infomation-nav {
    display: flex;
    justify-content: space-between;
    padding: 0 20px 10px;
    background-color: #fff;

    &__title {
      font-size: 20px;
      font-weight: 600;
    }

    &__options {
      margin-right: 10px;
    }
  }
</style>
