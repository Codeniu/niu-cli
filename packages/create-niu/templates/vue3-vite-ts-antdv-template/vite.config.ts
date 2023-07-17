import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import windiCSS from 'vite-plugin-windicss'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'
import { generateModifyVars } from './build/generate/generateModifyVars'
import { GLOB_CONFIG_FILE_NAME } from './build/constant'
import pkg from './package.json'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_GLOB_APP_TITLE, VITE_DROP_CONSOLE } = viteEnv

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`
  }

  const isBuild = command === 'build'

  return {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      https: false,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT || 3100,
      // proxy: createProxy(VITE_PROXY),
      proxy: {
        '/basic-dev': {
          target: 'https://mock.apifox.cn/m1/3022580-0-default',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-dev`), ''),
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:3300/upload',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/upload`), ''),
        },
      },
    },

    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: 'dist' + VITE_PUBLIC_PATH,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: isBuild,
        inject: {
          data: {
            title: VITE_GLOB_APP_TITLE,
          },
          // 将生成的 app.config.js 文件注入到模板html中
          tags: isBuild
            ? [
                {
                  tag: 'script',
                  attrs: {
                    src: getAppConfigSrc(),
                  },
                },
              ]
            : [],
        },
      }),
      // svg
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        svgoOptions: isBuild,
        // default
        symbolId: 'icon-[dir]-[name]',
      }),
      vueJsx(),
      windiCSS(),
    ],
  }
}
