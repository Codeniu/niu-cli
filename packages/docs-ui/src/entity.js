// 导入组件
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
import NQuizTimerButton from './QuizTimerButton/index.vue'

// 组件列表配置
const components = {
  BasicTitle,
  NDivider,
  NNav,
  NPicWrap,
  NComment,
  NRadioButton,
  NSteps,
  MileStone,
  FlowNotice,
  EmojiSelectDemo,
  NQuizTimerButton
}

// 导出单独组件
export { components as default }

// Vue插件安装函数
export function install(app) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(component.name || name, component)
  })
}

// 导出独立组件
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
  EmojiSelectDemo,
  NQuizTimerButton
}
