<template>
  <FileAnnotation v-bind="$attrs" @handle-name="onHandleName" />

  <a-modal title="附件预览" width="1200px" :open="previewVisible" :footer="null">
    <a-spin :spinning="previewLoading" tip="加载中...">
      <div style="max-height: 600px; min-height: 200px; overflow: auto">
        <LazyContainer class="text-center">
          <a-image-preview-group v-if="filePreviewObject.type === 'IMAGE'">
            <a-image v-for="src in filePreviewObject.urlList" :key="src" :src="src" />
          </a-image-preview-group>
          <div v-if="filePreviewObject.type === 'VIDEO'" class="text-center">
            <video width="700" :src="filePreviewObject.video" controls> </video>
          </div>
          <div v-if="filePreviewObject.type === 'AUDIO'" class="text-center">
            <audio width="700" :src="filePreviewObject.audio" controls> </audio>
          </div>
          <template #skeleton>
            <a-skeleton :rows="10" />
          </template>
        </LazyContainer>
      </div>
    </a-spin>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { previewKnowledge, setOssAddress } from '/@/apis/sys/file'
  import FileAnnotation from '/@/components/FileAnnotation/index.vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { LazyContainer } from '/@/components/Container/index'

  const { createMessage } = useMessage()

  const previewVisible = ref<boolean>(false)
  const previewLoading = ref<boolean>(false)
  const filePreviewObject = reactive({
    type: '',
    urlList: [],
    video: '',
    audio: '',
  })

  async function onHandleName({ filesrc }: any) {
    try {
      Object.assign(filePreviewObject, {
        type: '',
        urlList: [],
        video: '',
        audio: '',
      })
      const url = filesrc || ''
      previewVisible.value = true
      previewLoading.value = true
      const res = await previewKnowledge([url])
      const { type, urlList } = res[0]
      filePreviewObject.type = type
      switch (type) {
        case 'IMAGE':
          filePreviewObject.urlList = urlList.map((v: any) => setOssAddress(v))
          break
        case 'VIDEO':
          filePreviewObject.video = setOssAddress(urlList[0])
          break
        case 'AUDIO':
          filePreviewObject.audio = setOssAddress(urlList[0])
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        previewVisible.value = false
      }, 1000)
      createMessage.error('预览失败！')
    } finally {
      previewLoading.value = false
    }
  }
</script>

<style lang="less" scoped></style>
