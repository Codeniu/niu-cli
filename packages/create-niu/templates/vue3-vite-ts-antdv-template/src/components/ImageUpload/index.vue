<template>
  <a-upload
    v-model:file-list="fileList"
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    action="fakeaction"
    :before-upload="beforeUpload"
    accept="image/jpeg,image/png"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <PlusOutlined />
      <div class="ant-upload-text">上传</div>
    </div>
  </a-upload>
</template>
<script lang="ts">
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { message } from 'ant-design-vue'
  import { defineComponent, ref, watch } from 'vue'
  import { getBase64 } from '/@/utils/file/base64Conver'

  export default defineComponent({
    components: {
      PlusOutlined,
    },
    props: {
      file: Object,
    },
    emits: ['change', 'update:file'],
    setup(props, { emit }) {
      watch(
        () => props.file,
        (file: any) => {
          if (file) {
            fileList.value = [file]
            getBase64(file, (base64Url: string) => {
              imageUrl.value = base64Url
            })
          } else {
            fileList.value = []
            imageUrl.value = ''
          }
        },
      )

      const fileList = ref<any>([])
      const imageUrl = ref<string>('')

      const beforeUpload = (file: File) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          message.error('请选择图片')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          message.error('图片请小于 2MB!')
        }

        fileList.value = [...fileList.value, file]

        getBase64(file, (base64Url: string) => {
          imageUrl.value = base64Url
        })

        emit('change', file)
        emit('update:file', file)
        // 返回 false 取消自动上传
        return isJpgOrPng && isLt2M && false
      }

      return {
        fileList,
        imageUrl,
        beforeUpload,
      }
    },
  })
</script>
<style lang="less" scoped>
  img {
    width: 100%;
    height: 100%;
  }

  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
