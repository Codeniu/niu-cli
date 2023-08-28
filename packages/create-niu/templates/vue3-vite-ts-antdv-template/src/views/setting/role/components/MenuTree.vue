<template>
  <div class="menutree">
    <a-spin :spinning="loading">
      <a-tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        v-model:checkedKeys="checkedKeys"
        checkable
        :checkStrictly="true"
        :selectable="true"
        :tree-data="treeData"
        @check="onCheck"
        :field-names="{
          children: 'children',
          title: 'title',
          key: 'menuId',
        }"
      >
        <template #switcherIcon="{ switcherCls }">
          <down-outlined :class="switcherCls" />
        </template>

        <template #title="{ title, icon }">
          <SvgIcon v-if="icon" :name="icon" />
          <span style="color: rgb(0 0 0 / 65%)">{{ title }}</span>
        </template>
      </a-tree>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, toRaw } from 'vue'
  import { DownOutlined } from '@ant-design/icons-vue'
  import { TreeProps } from 'ant-design-vue/lib/tree/Tree'
  import { getAllMenus } from '/@/apis/setting/menu'
  import SvgIcon from '/@/components/SvgIcon.vue'

  const emits = defineEmits(['onCheck'])
  const props = defineProps({
    menus: {
      type: Array,
      default: () => [],
    },
  })

  const loading = ref(false)
  const expandedKeys = ref<any>([])
  const selectedKeys = ref<any>([])
  const checkedKeys = ref<any>([])
  const treeData = ref<TreeProps['treeData']>([])

  watch(
    () => props.menus,
    () => {
      const keys = (toRaw(props.menus) || []).map((v: any) => Number(v))
      loading.value = true
      expandedKeys.value = keys
      checkedKeys.value = keys
      loading.value = false
    },
    {
      immediate: true,
    },
  )

  const onCheck: TreeProps['onCheck'] = ({ checked }: any) => {
    console.log('keys: ', checked)
    emits('onCheck', checked)
  }

  const initData = async () => {
    const res = await getAllMenus({})
    treeData.value = res || []
  }

  initData()
</script>

<style lang="less" scoped>
  .menutree {
    height: 100%;
    padding: 12px 10px;
  }
</style>
