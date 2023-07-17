/**
 * Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
  VantResolve,
  ElementPlusResolve,
  NutuiResolve,
  AntdResolve,
} from 'vite-plugin-style-import'

export function configStyleImportPlugin(_isBuild: boolean) {
  // if (!isBuild) {
  //   return [];
  // }
  const styleImportPlugin = createStyleImportPlugin({
    resolves: [
      AndDesignVueResolve(),
      VantResolve(),
      ElementPlusResolve(),
      NutuiResolve(),
      AntdResolve(),
    ],
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`
        },
      },
    ],
  })
  return styleImportPlugin
}
