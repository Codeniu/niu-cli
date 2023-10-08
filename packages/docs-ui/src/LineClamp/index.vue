<template>
  <div class="wrapper">
    <div
      class="text"
      :style="{
        '-webkit-line-clamp': clampNum
      }"
    >
      <slot name="trigger">
        <button class="btn" @click="handleChange">
          {{ isHidden ? '展开' : '折叠' }}
        </button>
      </slot>
      <slot> </slot>

      <span class="dig" :style="isHidden ? '' : 'visibility:hidden'"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  lineClamp: {
    type: Number,
    default: 3
  }
})

const isHidden = ref(true)

const clampNum = ref(props.lineClamp)

const handleChange = () => {
  isHidden.value = !isHidden.value
  if (isHidden.value) {
    clampNum.value = props.lineClamp
  } else {
    clampNum.value = 999
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  margin: 50px auto;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
}
.text {
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  display: -webkit-box;
  // -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  position: relative;
}
.text::before {
  content: '';
  height: calc(100% - 24px);
  float: right;
}
.dig {
  width: 999vw;
  height: 999vw;
  position: absolute;
  box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0 #fff;
  margin-left: -100px;
}
.btn {
  float: right;
  clear: both;
  margin-left: 10px;
  font-size: 16px;
  padding: 0 8px;
  background: #3f51b5;
  line-height: 24px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}
</style>
