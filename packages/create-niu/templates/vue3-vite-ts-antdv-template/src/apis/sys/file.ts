import { defHttp } from '/@/utils/http/axios'

/**
 * @description: 通用附件预览接口
 */
export function preview(params: { url: string }) {
  return defHttp.get(
    {
      url: `/innovation/common/annexFile/preview`,
      params,
      timeout: 6000 * 10, // 10 min
    },
    {
      joinPrefix: false,
      isTransformResponse: true,
    },
  )
}

/**
 * @description: 通用附件删除接口
 */
export function deleteFileById(params: { ids: string[] }) {
  return defHttp.get(
    {
      url: `/innovation/common/annexFile/removeAnnexByIds?ids=${params.ids}`,
    },
    {
      joinPrefix: false,
      isTransformResponse: true,
    },
  )
}

/**
 * @description: 通用附件预览接口(知识库)
 */
export function previewKnowledge(data: string[]) {
  return defHttp.post(
    {
      url: `/innovation/common/annexFile/preview2Img`,
      data,
      timeout: 6000 * 10, // 10 min
    },
    {
      joinPrefix: false,
      isTransformResponse: true,
      errorMessageMode: 'none',
    },
  )
}

/**
 * @description OSS配置 用于预览以及静态文件下载
 * @param url
 */
export const setOssAddress = (url: string) => {
  const prod = `http://localhost:9000/studio/${url}` //生产
  const staging = `http://localhost:9000/studio/${url}` // 测试环境

  const { MODE } = import.meta.env
  return MODE === 'production' ? prod : staging
}
