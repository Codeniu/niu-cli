import BasicTitle from '../../../src/BasicTitle/index.vue'
import NDivider from '../../../src/Divider/index.vue'
import NNav from '../../../src/Nav/index.vue'
import NPicWrap from '../../../src/PicWrap/index.vue'
import NComment from '../../../src/Comment/index.vue'
import NRadioButton from '../../../src/RadioButtonGroup/demo.vue'
import NSteps from '../../../src/steps/index.vue'
import MileStone from '../../../src/steps/demo/index.vue'

export function useComponents(app) {
  app.component('BasicTitle', BasicTitle)
  app.component('NDivider', NDivider)
  app.component('NNav', NNav)
  app.component('NPicWrap', NPicWrap)
  app.component('NComment', NComment)
  app.component('NRadioButton', NRadioButton)

  app.component('NSteps', NSteps)
  app.component('MileStone', MileStone)
}
