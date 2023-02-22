<template>
  <div class="stone clearfix">
    <div class="stone-content">
      <NStep v-bind="$attrs">
        <template #icon>
          <span style="font-size: 30px">{{ info.icon }}</span>
        </template>
        <template #title>
          <StoneTitle :info="info" v-bind="$attrs" />
        </template>
        <template #description>
          <StoneContent> {{ info.content }} </StoneContent>
        </template>
      </NStep>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NStep from '../../components/step.vue'
// import SvgIcon from '/@/components/SvgIcon.vue'
import StoneTitle from './StoneTitle.vue'
import StoneContent from './StoneContent.vue'

defineProps({
  info: {
    type: Object,
    default: () => {
      return {
        time: '',
        type: '',
        typeName: '',
        icon: '',
        content: ''
      }
    }
  }
})
</script>

<style lang="less" scoped></style>
