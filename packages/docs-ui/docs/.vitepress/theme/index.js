import DefaultTheme from 'vitepress/theme'

import Wrap from './Wrap.vue'

import { useComponents } from './useComponents'

// import entity from '../../../src/entity'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    ctx.app.component('Wrap', Wrap)

    // entity.install(ctx.app)

    useComponents(ctx.app)
  }
}
