<template>
  <div class="niu-steps niu-steps-vertical">
    <n-step header-dot title="右边" description="默认文字在右边" />
    <n-step
      contentPosition="left"
      title="左边"
      description="contentPosition=left 属性将内容展示在左边"
    />
    <n-step>
      <template #title>传递插槽</template>
      <template #description>
        业务场景中有时需要对第三方组件进行二次封装, 比如弹窗,表格等组件,
        有时项目内会根据业务进行二次封装成业务组件,
        新的业务组件会需要把自己的slots透传给原本的组件, 也可以叫传递插槽
      </template>
    </n-step>
  </div>
</template>

<script lang="ts" setup name="NSteps">
import NStep from './components/step.vue'
</script>

<style lang="less" scoped>
.niu-steps {
  // background-color: red;
}

.niu-steps-vertical {
  display: block;
}
</style>
