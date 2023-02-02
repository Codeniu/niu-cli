import BasicTitle from '../../../src/basicTitle/index.vue'
import NDivider from '../../../src/divider/index.vue'
import NNav from '../../../src/nav/index.vue'
import PicWrap from '../../../src/PicWrap/index.vue'
import Comment from '../../../src/Comment/index.vue'
import NRadioButton from '../../../src/RadioButtonGroup/demo.vue'

export function useComponents(app) {
  app.component('BasicTitle', BasicTitle)
  app.component('NDivider', NDivider)
  app.component('NNav', NNav)
  app.component('PicWrap', PicWrap)
  app.component('Comment', Comment)
  app.component('NRadioButton', NRadioButton)
}
