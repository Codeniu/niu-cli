<template>
  <div class="clearfix">
    <a-alert message="请选择excel文件" type="info" show-icon />
    <a-upload
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
      accept="*.xls,*.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    >
      <a-button :disabled="fileList.length !== 0" class="mt-10px">
        <upload-outlined />
        选择文件
      </a-button>
    </a-upload>
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? '上传中' : '开始上传' }}
    </a-button>
  </div>
</template>
<script lang="ts">
  import { UploadOutlined } from '@ant-design/icons-vue'
  import { defineComponent, ref } from 'vue'
  import { message } from 'ant-design-vue'
  import { importUsers } from '/@/apis/user/user'

  interface FileItem {
    uid: string
    name?: string
    status?: string
    response?: string
    url?: string
    preview?: string
    originFileObj?: any
    file: string | Blob
  }

  export default defineComponent({
    components: {
      UploadOutlined,
    },
    emits: ['upload-success'],
    setup(props, { emit }) {
      const fileList = ref<FileItem[]>([])
      const uploading = ref<boolean>(false)

      const handleRemove = (file: FileItem) => {
        const index = fileList.value.indexOf(file)
        const newFileList = fileList.value.slice()
        newFileList.splice(index, 1)
        fileList.value = newFileList
      }

      const beforeUpload = (file: FileItem) => {
        fileList.value = [...fileList.value, file]
        return false
      }

      const handleUpload = async () => {
        const formData = new FormData()
        fileList.value.forEach((file: FileItem) => {
          formData.append('multipartFile', file as any)
        })
        uploading.value = true

        try {
          await importUsers(formData)
          message.success('上传成功')
          fileList.value = []
          emit('upload-success')
        } catch (error) {
          message.error('上传失败')
        } finally {
          uploading.value = false
        }
      }

      return {
        fileList,
        uploading,
        handleRemove,
        beforeUpload,
        handleUpload,
      }
    },
  })
</script>
