import 'virtual:svg-icons-register'
import '/@/design/index.less'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '/@/store'
import { router, setupRouter } from '/@/router'
import { setupRouterGuard } from '/@/router/guard'
import 'virtual:windi.css'
import 'ant-design-vue/dist/antd.css'
import { registerGlobAntd } from '/@/components/registerGlobComp'
import { setupGlobDirectives } from '/@/directives/index'

async function bootstrap() {
  const app = createApp(App)

  // Configure store
  setupStore(app)

  // Configure routing
  setupRouter(app)

  // router-guard
  setupRouterGuard(router)

  // Register global components
  registerGlobAntd(app)
  // registerGlobComp(app)

  // global directives
  setupGlobDirectives(app)

  app.mount('#app')
}

bootstrap()
