<template>
  <div class="orgtree">
    <a-tree
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      show-line
      :tree-data="treeData"
      @select="onSelect"
      :field-names="{
        children: 'childList',
        title: 'deptName',
        key: 'deptId',
      }"
    >
      <template #switcherIcon="{ switcherCls }">
        <down-outlined :class="switcherCls" />
      </template>
      <template #title="{ deptName }">
        <span style="color: rgb(0 0 0 / 65%)">{{ deptName }}</span>
      </template>
    </a-tree>
    <a-button type="dashed" style="width: 100%; margin-top: 10px" @click="handleAddCompany">
      + 新增公司
    </a-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { DownOutlined } from '@ant-design/icons-vue'
  import { TreeProps } from 'ant-design-vue/lib/tree/Tree'

  import { orgList } from '/@/apis/sys/org'

  const emits = defineEmits(['onSelect'])

  const expandedKeys = ref<string[]>(['0-0-0'])
  const selectedKeys = ref<string[]>([])
  const treeData = ref<TreeProps['treeData']>([])

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    // console.log('selected', selectedKeys, info)
    emits('onSelect', selectedKeys, info)
  }

  const initData = async () => {
    const res = await orgList()
    treeData.value = res || []
  }

  onMounted(() => {
    initData()
  })

  const handleAddCompany = () => {
    // todo
  }
</script>

<style lang="less" scoped>
  .orgtree {
    height: 100%;
    padding: 12px 10px;
  }
</style>
