import DefaultTheme from 'vitepress/theme'

import { useComponents } from './useComponents'

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import comment from '../components/comment.vue'
import copyright from '../components/copyright.vue'

// import entity from '../../../src/entity'

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-after': () => h(comment),
      'doc-footer-before': () => h(copyright)
    })
  },
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    // entity.install(ctx.app)

    useComponents(ctx.app)
  }
}
