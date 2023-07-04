<template>
  <div class="comments">
    <component
      v-if="showComment"
      src="https://giscus.app/client.js"
      :is="'script'"
      :key="title"
      :data-repo="giscusConfig.repo"
      :data-repo-id="giscusConfig.repoId"
      :data-category="giscusConfig.category"
      :data-category-id="giscusConfig.categoryId"
      :data-mapping="giscusConfig.mapping"
      :data-strict="giscusConfig.strict"
      :data-reactions-enabled="giscusConfig.reactionsEnabled"
      :data-emit-metadata="giscusConfig.emitMetadata"
      :data-input-position="giscusConfig.inputPosition"
      :data-lang="giscusConfig.lang"
      :data-theme="giscusConfig.theme"
      :data-loading="giscusConfig.loading"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const route = useRoute()

const { title } = useData()

// params generate in https://giscus.app/zh-CN
const giscusConfig = reactive({
  repo: 'Codeniu/niu-cli',
  repoId: 'R_kgDOIlDkEg',
  category: 'Announcements',
  categoryId: 'DIC_kwDOIlDkEs4CXqSt',
  mapping: 'title',
  strict: '0',
  reactionsEnabled: '0',
  emitMetadata: '0',
  inputPosition: 'top',
  theme: 'light',
  lang: 'zh-CN',
  loading: 'lazy',
  crossorigin: 'anonymous'
})

const showComment = ref(true)
watch(
  () => route.path,
  () => {
    showComment.value = false
    setTimeout(() => {
      showComment.value = true
    }, 200)
  },
  {
    immediate: true
  }
)
</script>
<style>
/* // TODO 使用giscus自定义主题结合vitepress主题切换 */
.comments {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}
</style>
