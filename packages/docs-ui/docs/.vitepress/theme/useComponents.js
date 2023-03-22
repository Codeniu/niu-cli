import BasicTitle from '../../../src/BasicTitle/index.vue'
import NDivider from '../../../src/Divider/index.vue'
import NNav from '../../../src/Nav/index.vue'
import NPicWrap from '../../../src/PicWrap/index.vue'
import NComment from '../../../src/Comment/index.vue'
import NRadioButton from '../../../src/RadioButtonGroup/demo.vue'
import NSteps from '../../../src/Steps/index.vue'
import MileStone from '../../../src/Steps/demo/index.vue'
import FlowNotice from '../../../src/FlowNotice/demo.vue'

import Wrap from './Wrap.vue'

export function useComponents(app) {
  app.component('BasicTitle', BasicTitle)
  app.component('NDivider', NDivider)
  app.component('NNav', NNav)
  app.component('NPicWrap', NPicWrap)
  app.component('NComment', NComment)
  app.component('NRadioButton', NRadioButton)

  app.component('NSteps', NSteps)
  app.component('MileStone', MileStone)

  app.component('Wrap', Wrap)

  app.component('FlowNotice', FlowNotice)
}
