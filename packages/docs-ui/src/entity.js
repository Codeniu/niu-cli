import BasicTitle from './BasicTitle/index.vue'
import NDivider from './Divider/index.vue'
import NNav from './Nav/index.vue'
import NPicWrap from './PicWrap/index.vue'
import NComment from './Comment/index.vue'
import NRadioButton from './RadioButtonGroup/demo.vue'
import NSteps from './Steps/index.vue'
import MileStone from './Steps/demo/index.vue'
import FlowNotice from './FlowNotice/demo.vue'
import EmojiSelectDemo from './EmojiSelect/demo.vue'

// 导出单独组件
export {
  BasicTitle,
  NDivider,
  NNav,
  NPicWrap,
  NComment,
  NRadioButton,
  NSteps,
  MileStone,
  FlowNotice,
  EmojiSelectDemo
}

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

    app.component('FlowNotice', FlowNotice)

    app.component('EmojiSelectDemo', EmojiSelectDemo)
  }
}
