import { ref } from 'vue'

// Telport元素必须在目标元素挂载之后才能使用，这里控制一下Teleport元素的挂载时机，更好的方法是判断目标元素是否挂载完成
export function useTeleportEffects() {
  const showTeleport = ref<boolean>(false)
  setTimeout(() => {
    showTeleport.value = true
  }, 200)
  return {
    showTeleport,
  }
}
