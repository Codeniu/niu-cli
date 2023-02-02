<template>
  <div>
    <ButtonItem
      v-for="(item, index) in options"
      :key="item.value + index"
      v-bind="$attrs"
      :info="item"
      @change="onChange"
      :actived="selectedValue === item.value"
      class="mx-4px"
    >
      {{ item.label }}
    </ButtonItem>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ButtonItem from './ButtonItem.vue'

type optionsType = {
  label: string
  value: any
}

interface Props {
  options: optionsType[]
  modelValue: any
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  modelValue: ''
})

const emits = defineEmits(['update:modelValue', 'change'])

const selected = ref<optionsType>({
  label: '',
  value: ''
})
const selectedValue = ref(props.modelValue)

function onChange(val: optionsType) {
  selected.value = val
  selectedValue.value = val.value
  emits('update:modelValue', val.value)
  emits('change', { item: val, val: val.value })
}
</script>

<style lang="less" scoped>
.mx-4px {
  margin: 0 4px;
}
</style>
