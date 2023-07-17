<template>
  <div ref="wrapRef"></div>
</template>
<script lang="ts">
  import type { Ref } from 'vue'
  import { defineComponent, ref, unref, nextTick, watch, onBeforeUnmount, onDeactivated } from 'vue'
  import Vditor from 'vditor'
  import 'vditor/dist/index.css'
  // import { useModalContext } from '../../Modal'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'
  import { getToken } from '/@/utils/auth'
  import { setOssAddress } from '/@/apis/sys/file'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useGlobSetting } from '/@/hooks/setting'

  // type Lang = 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' | undefined

  export default defineComponent({
    inheritAttrs: false,
    props: {
      height: { type: Number, default: 360 },
      value: { type: String, default: '' },
    },
    emits: ['change', 'get', 'update:value'],
    setup(props, { attrs, emit }) {
      const wrapRef = ref<ElRef>(null)
      const vditorRef = ref(null) as Ref<Nullable<Vditor>>
      const initedRef = ref(false)
      const token = getToken()
      const { createMessage } = useMessage()
      const globSetting = useGlobSetting()

      // const modalFn = useModalContext()

      const getDarkMode = ref('classic')
      const valueRef = ref(props.value || '')

      watch(
        [() => getDarkMode.value, () => initedRef.value],
        ([val, inited]) => {
          if (!inited) {
            return
          }
          const theme = val === 'dark' ? 'dark' : 'classic'
          instance.getVditor()?.setTheme(theme)
        },
        {
          immediate: true,
          flush: 'post',
        },
      )

      watch(
        () => props.value,
        (v) => {
          if (v !== valueRef.value) {
            instance.getVditor()?.setValue(v)
          }
          valueRef.value = v
        },
      )

      function init() {
        const wrapEl = unref(wrapRef) as HTMLElement
        if (!wrapEl) return
        const bindValue = { ...attrs, ...props }
        const insEditor = new Vditor(wrapEl, {
          theme: getDarkMode.value === 'dark' ? 'dark' : 'classic',
          lang: 'zh_CN', // 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR'
          mode: 'wysiwyg',
          cdn: 'http://localhost/static/vditor',
          emojiPath: 'http://localhost/static/vditor/dist/images/emoji',
          fullscreen: {
            index: 520,
          },
          preview: {
            actions: [],
          },
          upload: {
            headers: {
              STO: token,
            },
            accept: 'image/*,.wav,.jpg,.png,.gif,.jpeg,.svg',
            fieldName: 'files',
            url: globSetting.apiUrl + '/innovation/common/annexFile/pictureBed',
            linkToImgUrl: globSetting.apiUrl + '/innovation/common/annexFile/pictureBed',
            filename(name) {
              return name
                .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
                .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
                .replace('/\\s/g', '')
            },
            success(editor, msg) {
              try {
                const responseData = JSON.parse(msg)
                const { code, data } = responseData

                let succFileText = ''
                if (code === '200') {
                  ;(data || []).forEach((path: string) => {
                    const imageUrl = setOssAddress(path)
                    succFileText += `\n <img alt=${imageUrl} src="${imageUrl}">`
                  })
                  //将图片路径写入文本
                  instance.getVditor()?.insertValue(succFileText)
                  createMessage.success('上传成功')
                } else {
                  console.log('失败', msg)
                  createMessage.error('上传失败')
                }
              } catch (error) {
                console.log(error)
              }
            },
            error(msg) {
              console.log('失败', msg)
              createMessage.error('上传失败')
            },
          },
          input: (v) => {
            valueRef.value = v
            emit('update:value', v)
            emit('change', v)
          },
          after: () => {
            nextTick(() => {
              // modalFn?.redoModalHeight?.()
              insEditor.setValue(valueRef.value)
              vditorRef.value = insEditor
              initedRef.value = true
              emit('get', instance)
            })
          },
          blur: () => {
            //unref(vditorRef)?.setValue(props.value);
          },
          ...bindValue,
          cache: {
            enable: false,
          },
        })
      }

      const instance = {
        getVditor: (): Vditor => vditorRef.value!,
      }

      function destroy() {
        const vditorInstance = unref(vditorRef)
        if (!vditorInstance) return
        try {
          vditorInstance?.destroy?.()
        } catch (error) {}
        vditorRef.value = null
        initedRef.value = false
      }

      onMountedOrActivated(init)

      onBeforeUnmount(destroy)
      onDeactivated(destroy)
      return {
        wrapRef,
        ...instance,
      }
    },
  })
</script>
