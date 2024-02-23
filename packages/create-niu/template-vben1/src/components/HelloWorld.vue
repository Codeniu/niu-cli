<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { StepBackwardOutlined } from '@ant-design/icons-vue'
  import { useUserStoreWithOut } from '/@/store/modules/user'

  const userStore = useUserStoreWithOut()

  const getIsSessionTimeout = computed(() => userStore.getSessionTimeout)

  defineProps<{ msg: string }>()

  onMounted(() => {
    console.log('hello')
  })

  const count = ref(1)
</script>

<template>
  <h1 class="header">{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

  <a-button type="primary">Primary Button</a-button>
  <StepBackwardOutlined />

  <p>
    {{ getIsSessionTimeout }}
  </p>
</template>

<style scoped lang="less">
  a {
    color: #42b983;
  }

  .header {
    color: var(--header-bg-color);
    background-color: @red;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
