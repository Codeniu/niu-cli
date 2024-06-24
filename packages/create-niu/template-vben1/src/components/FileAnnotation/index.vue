<template>
  <div class="annotation" :class="`annotation__${direction}`">
    <img :src="image" v-if="showIcon" />
    <a-tooltip :title="name">
      <div class="flex justify-between items-center">
        <span class="cursor-hand annotation-name text-wrap" @click="onPreview">{{ name }}</span>
        <a-button type="link" @click="handleDownload">下载</a-button>
      </div>
    </a-tooltip>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import PPT from '/@/assets/images/file-type/ppt.png'
  import PDF from '/@/assets/images/file-type/pdf.png'
  import WORD from '/@/assets/images/file-type/word.png'
  import PNG from '/@/assets/images/file-type/png.png'
  import No from '/@/assets/images/file-type/no.png'
  import { downloadByUrl } from '/@/utils/file/download'

  const IMAGES: { [key: string]: any } = {
    ppt: PPT,
    pdf: PDF,
    doc: WORD,
    docx: WORD,
    png: PNG,
    jpg: PNG,
    jpeg: PNG,
    no: No,
  }
  // const ALLOW_PREVIEW = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'txt']
  export default defineComponent({
    name: 'TlAnnotation',
    props: {
      showIcon: {
        type: Boolean,
        default: true,
      },
      // 文件类型
      type: {
        type: String,
        default: 'ppt',
        // validator: function (value: string) {
        //   return ['ppt', 'pdf', 'word'].indexOf(value) !== -1
        // },
      },
      name: {
        type: String,
        default: '',
      },
      direction: {
        type: String,
        default: 'horizontal', // vertical or horizontal
      },
      filesrc: {
        type: String,
        default: '',
        requiere: true,
      },
      file: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    emits: ['handleName'],
    setup(props, { emit }) {
      const image = computed(() => {
        return IMAGES[props.type] || IMAGES.no
      })

      const filename = computed(() => {
        return props.name
      })

      function onPreview() {
        emit('handleName', { file: props.file, filesrc: props.filesrc })
      }

      function handleDownload() {
        const { file, filesrc } = props
        console.log(' file,filesrc: ', file, filesrc)
        // emit('handleDownload', { file: props.file, filesrc: props.filesrc })

        downloadByUrl({
          url: filesrc,
          // target: '_self',
        })
      }

      return {
        image,
        filename,
        onPreview,
        handleDownload,
      }
    },
  })
</script>
<style lang="less" scoped>
  .annotation {
    display: flex;

    & > span {
      line-height: 32px;
      margin-left: 10px;

      &:hover {
        color: #1890ff;
      }
    }

    & > img {
      width: 28px;
      height: 32px;
    }

    &__horizontal {
      flex-direction: row;
    }

    &__vertical {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
