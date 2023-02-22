import BasicTitle from './basicTitle/index.vue'
import NDivider from './divider/index.vue'
import NNav from './nav/index.vue'
import PicWrap from './picWrap/index.vue'
import Comment from './comment/index.vue'
import NRadioButton from './radioButtonGroup/demo.vue'
import NSteps from './steps/index.vue'

// 导出单独组件
export { BasicTitle }

// 引用
export default {
  install(app) {
    app.component(BasicTitle.name, BasicTitle)

    app.component('NDivider', NDivider)
    app.component('NNav', NNav)
    app.component('PicWrap', PicWrap)
    app.component('Comment', Comment)
    app.component('NRadioButton', NRadioButton)
    app.component('NSteps', NSteps)
  }
}
