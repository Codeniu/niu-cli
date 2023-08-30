<template>
  <a-input disabled placeholder="请选择图标" v-model:value="currentSelect">
    <template #addonAfter>
      <a-popover
        placement="bottomLeft"
        trigger="click"
        v-model="visible"
        overlayClassName="icon-picker-popover"
      >
        <template #title>
          <div class="flex justify-between w-300px">
            <a-input placeholder="搜索" @change="debounceHandleSearchChange" allowClear />
          </div>
        </template>

        <template #content>
          <div v-if="getPaginationList.length" class="w-300px">
            <ScrollContainer class="border border-solid">
              <ul class="flex flex-wrap px-2">
                <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary"
                  @click="handleClick(icon)"
                  :title="icon"
                >
                  <SvgIcon :name="icon" />
                </li>
              </ul>
            </ScrollContainer>
            <div class="flex py-2 items-center justify-center" v-if="getTotal >= pageSize">
              <a-pagination
                showLessItems
                size="small"
                :pageSize="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else
            ><div class="p-5"><a-empty /></div>
          </template>
        </template>

        <span class="cursor-pointer px-2 py-1 flex items-center" v-if="currentSelect">
          <SvgIcon :name="currentSelect" />
        </span>
        <span class="cursor-pointer" v-else>展开</span>
      </a-popover>
    </template>
  </a-input>
</template>

<script lang="ts" setup>
  import { ref, watch, watchEffect } from 'vue'
  import { useDebounceFn } from '@vueuse/core'
  import { usePagination } from '/@/hooks/web/usePagination'
  import ScrollContainer from '/@/components/ScrollContainer/index.vue'
  import SvgIcon from './SvgIcon.vue'

  import svgIcons from 'virtual:svg-icons-names'

  function getSvgIcons() {
    return svgIcons.map((icon: any) => icon.replace('icon-', ''))
  }

  const props = withDefaults(
    defineProps<{
      value: string
      pageSize?: number
    }>(),
    {
      value: '',
      pageSize: 40,
    },
  )

  const emit = defineEmits(['change', 'update:value'])

  const icons = getSvgIcons()

  const currentSelect = ref('')
  const visible = ref(false)
  const currentList = ref(icons)

  // eslint-disable-next-line vue/no-setup-props-destructure
  const { getPaginationList, getTotal, setCurrentPage } = usePagination(currentList, props.pageSize)
  console.log('getPaginationList: ', getPaginationList)

  watchEffect(() => {
    currentSelect.value = props.value
  })

  watch(
    () => currentSelect.value,
    (v) => {
      emit('update:value', v)
      return emit('change', v)
    },
  )

  const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100)

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  function handleClick(icon: string) {
    currentSelect.value = icon
  }

  function handleSearchChange(e: any) {
    const value = e.target.value
    if (!value) {
      setCurrentPage(1)
      currentList.value = icons
      return
    }
    currentList.value = icons.filter((item: any) => item.includes(value))
  }
</script>

<style lang="less" scoped>
  .icon-picker-popover {
    .ant-input-group-addon {
      padding: 0;
    }

    .ant-popover-inner-content {
      padding: 0;
    }

    .scrollbar {
      height: 220px;
    }

    .border-primary {
      border: 1px solid #41a2d8;
    }
  }
</style>
