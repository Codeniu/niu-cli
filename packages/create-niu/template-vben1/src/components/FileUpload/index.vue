<template>
  <div class="clearfix">
    <a-upload
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
      :multiple="true"
    >
      <a-button>
        <UploadOutlined />
        选择文件
      </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts">
  import { UploadOutlined } from '@ant-design/icons-vue'
  import { defineComponent, ref, watch } from 'vue'

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
    props: {
      file: Object,
    },
    emits: ['change', 'update:file'],
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
        emit('change', file, fileList.value)
        emit('update:file', fileList.value)
        return false
      }

      watch(
        () => props.file,
        (file: any) => {
          fileList.value = file || []
        },
      )

      return {
        fileList,
        uploading,
        handleRemove,
        beforeUpload,
      }
    },
  })
</script>
