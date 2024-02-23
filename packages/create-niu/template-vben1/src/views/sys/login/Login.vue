<template>
  <div class="login h-full flex">
    <div class="login-bg">
      <div class="login-bg-logo">
        <img :src="Logo" alt="" />
      </div>
      <div class="login-bg-des">
        <img :src="Des" alt="" />
      </div>
    </div>
    <div class="login-form">
      <LoginForm />
      <QrCodeForm />
      <ForgetPasswordForm />
    </div>
  </div>
  <MarkDown v-show="false" />
</template>

<script lang="ts" setup>
  import { ref, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useUserStore } from '/@/store/modules/user'
  import LoginForm from './LoginForm.vue'
  import QrCodeForm from './QrCodeForm.vue'
  import ForgetPasswordForm from './ForgetPasswordForm.vue'
  import Logo from '/@/assets/icons/logo.svg'
  import Des from '/@/assets/images/login/login-des.svg'
  import { MarkDown } from '/@/components/Markdown'

  const userStore = useUserStore()
  const { notification, createErrorModal } = useMessage()
  const { currentRoute } = useRouter()

  const loading = ref<boolean>(false)

  watchEffect(async () => {
    const code = currentRoute.value.query?.code
    if (code) {
      try {
        loading.value = true
        const userInfo = await userStore.qrcodeLogin({
          code: code + '',
          mode: 'none', //不要默认的错误提示
        })
        if (userInfo) {
          notification.success({
            message: '登录成功',
            description: `${'欢迎回来'}: ${userInfo.userTitle}`,
            duration: 3,
          })
        }
      } catch (error) {
        createErrorModal({
          title: '错误提示',
          content: (error as unknown as Error).message || '网络异常，请检查网络是否正常',
          getContainer: () => document.body.querySelector('.login') || document.body,
        })
      } finally {
        loading.value = false
      }
    }
  })
</script>

<style lang="less" scoped>
  .login {
    position: relative;
    min-height: 100%;
    overflow: hidden;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(/@/assets/images/login/login-bg.svg);
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: 100%;
      content: '';
    }

    &-bg {
      position: absolute;
      top: 76px;
      left: 10%;

      &-logo {
        width: 228px;
      }

      &-des {
        margin-top: 40%;
      }
    }

    &-form {
      width: 460px;
      height: 520px;
      padding: 0 68px;
      position: absolute;
      top: 50%;
      right: 120px;
      transform: translateY(-50%);
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
