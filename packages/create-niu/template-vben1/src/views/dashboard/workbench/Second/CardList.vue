<template>
  <div class="list-wrap">
    <CardListItem
      v-for="item in data"
      :key="item.id"
      :type="item.type"
      :title="item.company"
      :color="item.color"
    />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import CardListItem from './CardListItem.vue'

  interface ListItem {
    id: string | number
    type: string
    company: string
  }

  type ColorType = 'default' | 'danger' | 'warning'

  type ExtendedListItem = ListItem & {
    color?: ColorType
  }

  const props = defineProps({
    list: {
      type: Array as () => ListItem[],
      default: () => [],
    },
  })

  const data = ref([] as ExtendedListItem[])

  onMounted(() => {
    data.value = props.list.map((v: ListItem) => {
      return {
        ...v,
        color: getColorName(v.type),
      }
    })
  })

  const getColorName = (str: string | number) => {
    switch (str) {
      case '法人变更':
      case '董事变更':
      case '监事变更':
        return 'default'
      case '比对异常':
      case '经营风险':
        return 'danger'
      case '司法风险':
        return 'warning'
      default:
        return 'default'
    }
  }
</script>

<style lang="less" scoped>
  .list-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
