import BasicTitle from '../../../src/basicTitle/index.vue'
import NDivider from '../../../src/divider/index.vue'
import NNav from '../../../src/nav/index.vue'

export function useComponents(app) {
  app.component('BasicTitle', BasicTitle)
  app.component('NDivider', NDivider)
  app.component('NNav', NNav)
}
