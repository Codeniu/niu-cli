<template>
  <a-layout :style="{ minHeight: '100%' }">
    <Header />
    <a-layout>
      <!-- main -->
      <a-layout class="main-container">
        <a-layout-content
          class="main-content"
          :style="{
            minHeight: '200px',
          }"
        >
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
  import { defineComponent } from 'vue'
  import Header from '../default/header/index.vue'

  export default defineComponent({
    components: {
      Header,
    },
    setup() {},
  })
</script>
<style lang="less" scoped>
  .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }

  .main-content {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    padding: 20px;
    background-color: #f4faff;
  }
</style>
