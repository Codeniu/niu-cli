import DefaultTheme from 'vitepress/theme'
import { useComponents } from './useComponents'
// import NiuUI from '../../../src/entity'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // ctx.app.use(NiuUI)
    useComponents(ctx.app)
  }
}
