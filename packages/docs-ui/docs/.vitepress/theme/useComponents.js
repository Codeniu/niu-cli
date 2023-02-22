import {
  BasicTitle,
  NDivider,
  NNav,
  NPicWrap,
  NComment,
  NRadioButton,
  NSteps,
  MileStone
} from '../../../src/entity'

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
