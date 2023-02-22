import DefaultTheme from 'vitepress/theme'

import '../../public/index.less'
import Wrap from './Wrap.vue'

import entity from '../../../src/entity'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    ctx.app.component('Wrap', Wrap)

    entity.install(ctx.app)
  }
}
