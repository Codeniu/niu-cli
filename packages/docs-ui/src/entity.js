import BasicTitle from './basicTitle/index.vue'
import NDivider from './divider/index.vue'
import NNav from './nav/index.vue'
import NPicWrap from './PicWrap/index.vue'
import NComment from './comment/index.vue'
import NRadioButton from './radioButtonGroup/demo.vue'
import NSteps from './steps/index.vue'
import MileStone from './steps/demo/index.vue'

// 导出单独组件
export { BasicTitle }

// 引用
export default {
  install(app) {
    app.component(BasicTitle.name, BasicTitle)

    app.component('NDivider', NDivider)
    app.component('NNav', NNav)
    app.component('NPicWrap', NPicWrap)
    app.component('NComment', NComment)
    app.component('NRadioButton', NRadioButton)

    app.component('NSteps', NSteps)
    app.component('MileStone', MileStone)
  }
}
