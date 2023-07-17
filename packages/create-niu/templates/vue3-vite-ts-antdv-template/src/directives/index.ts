/**
 * Configure and register global directives
 */
import type { App } from 'vue'
import { setupTooltipDirective } from './tooltip'

export function setupGlobDirectives(app: App) {
  setupTooltipDirective(app)
}
