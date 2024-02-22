<template>
  <a-select
    v-model:value="value"
    style="width: 100%"
    mode="multiple"
    placeholder="请选择"
    @change="change"
    :options="formattedMonths.map((item) => ({ value: item }))"
  >
    <template #dropdownRender="{ menuNode: menu }">
      <div
        class="select-time"
        style="padding: 4px 8px; cursor: pointer"
        @mousedown="(e) => e.preventDefault()"
      >
        <span
          icon="ant-design:double-left-outlined"
          color="#d7d7d7"
          @click="handleLeftButtonClick"
        ></span>
        <div>{{ currentYear }}</div>
        <span
          icon="ant-design:double-right-outlined"
          color="#d7d7d7"
          @click="handleRightButtonClick"
        ></span>
      </div>
      <a-divider style="margin: 4px 0" />
      <v-nodes :vnodes="menu" />
    </template>
  </a-select>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, computed } from 'vue'
import dayjs from 'dayjs'
let index = 0
export default defineComponent({
  props: {
    types: {
      type: String,
      required: true,
      default: 'quarter' // 季度 quarter || 月度 month
    }
  },
  components: {
    PlusOutlined,
    VNodes: (_, { attrs }) => {
      return attrs.vnodes
    }
  },
  setup(options, { emit }) {
    let currentYear = ref(dayjs().format('YYYY'))
    const formattedMonths = computed(() => {
      let monthNames = null
      if (options.types == 'quarter') {
        monthNames = ['一季度', '二季度', '三季度', '四季度']
      } else {
        monthNames = [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ]
      }
      return monthNames.map((month) => `${currentYear.value}-${month}`)
    })
    const addItem = () => {
      console.log('addItem')
      items.value.push(`New item ${index++}`)
    }
    const value = ref([])
    // 左切换按钮点击事件处理程序
    function handleLeftButtonClick() {
      currentYear.value = dayjs(currentYear.value)
        .subtract(1, 'year')
        .format('YYYY')
    }
    // 右切换按钮点击事件处理程序
    function handleRightButtonClick() {
      currentYear.value = dayjs(currentYear.value).add(1, 'year').format('YYYY')
    }
    function change(e) {
      console.log(e)
      emit('chageSelect', e)
    }
    return {
      value,
      formattedMonths,
      currentYear,
      handleLeftButtonClick,
      handleRightButtonClick,
      change
    }
  }
})
</script>

<style lang="less">
.select-time {
  display: flex;
  padding: 3px 5px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
</style>
