import BasicTitle from './basicTitle/index.vue'

// 导出单独组件
export { BasicTitle }

// 编写一个插件，实现一个install方法

console.log('BasicTitle', BasicTitle.name)

export default {
  install(app) {
    app.component(BasicTitle.name, BasicTitle)
  }
}
