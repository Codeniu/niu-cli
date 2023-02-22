import BasicTitle from './basicTitle/index.vue'
import NDivider from './divider/index.vue'
import NNav from './nav/index.vue'
import PicWrap from './PicWrap/index.vue'
import Comment from './Comment/index.vue'
import NRadioButton from './RadioButtonGroup/demo.vue'

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
  }
}
