import DefaultTheme from 'vitepress/theme'

import { useComponents } from './useComponents'

// import entity from '../../../src/entity'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    // entity.install(ctx.app)

    useComponents(ctx.app)
  }
}
