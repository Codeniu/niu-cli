<template>
  <div v-show="getShow">
    <div class="type" @click="setLoginState(LoginStateEnum.QR_CODE)"></div>
    <h1 class="text-gray-600">hi, 你好</h1>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :style="{
        width: '100%',
      }"
    >
      <a-form-item name="username">
        <a-input v-model:value="formState.username" placeholder="请输入账号" size="large" />
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          v-model:value="formState.password"
          placeholder="请输入密码"
          size="large"
          @keyup.enter="handleLogin"
        />
      </a-form-item>
      <!-- <a-form-item name="verificationcode">
        <div class="flex justify-between">
          <a-input
            v-model:value="formState.verificationcode"
            placeholder="请输入验证码"
            size="large"
          />
          <s-identify ref="sidentify" @change="identifyChange" />
        </div>
      </a-form-item> -->
    </a-form>
    <a-button type="primary" @click="handleLogin" size="large" class="w-full" :loading="loading">
      登录
    </a-button>
    <!-- <div
      class="text-right mt-10px"
      :style="{
        color: '#B2B2B2',
      }"
    >
      <span class="cursor-pointer" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
        忘记密码
      </span>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue'
  import { LoginStateEnum, useLoginState } from './useLogin'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useUserStore } from '/@/store/modules/user'
  import { doEncrypt } from '/@/utils/encrypt'
  // import SIdentify from '/@/components/SIdentify/index.vue'

  const { notification, createErrorModal } = useMessage()
  const { getLoginState, setLoginState } = useLoginState()
  const userStore = useUserStore()

  const loading = ref<boolean>(false)
  const formRef = ref()
  const formState = reactive({
    username: '',
    password: '',
    verificationcode: '',
  })
  const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    // verificationcode: [
    //   // { required: true, message: '请输入验证码', trigger: 'blur' },
    //   {
    //     validator: (rule: any, value: any) => {
    //       if (!value) {
    //         return Promise.reject('请输入验证码')
    //       }
    //       if (value && value !== securityCode.value) {
    //         // refreshCode()
    //         return Promise.reject('验证码不正确')
    //       }
    //       return Promise.resolve()
    //     },
    //   },
    // ],
  }

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  async function handleLogin() {
    const data = await formRef.value.validate()
    if (!data) return
    try {
      loading.value = true
      const userInfo = await userStore.login({
        username: data.username,
        password: doEncrypt(data.password) || data.password,
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

  // const securityCode = ref('')
  // function identifyChange(code: string) {
  //   securityCode.value = code.toLowerCase()
  // }

  // const sidentify = ref()
  // function refreshCode() {
  //   sidentify.value.refreshCode()
  //   setTimeout(() => {
  //     formState.verificationcode = ''
  //   }, 1000)
  // }
</script>

<style lang="less" scoped>
  .type {
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    margin: 10px;
    cursor: pointer;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAKlBMVEVHcEyHquiGqueGq+iGq+eHrOmGq+eFqueGqueNsO6JrOeHq+eUru2Fqub6x9OvAAAADXRSTlMAXLyHqEiY9eQSKXELCCPK/wAAAcRJREFUWMPt1jFLw1AUBeBTQgs1ix0cC/IGFyn4B7Jo14KL1MVBkbu5uDgFxMUsgmsGwc2pYH9AoJPo4FKFgnL/i0OfbdL2mXcQRKpnKn18PYXb3FdEOpdVALHqEEAwf6qL3iwjiHgS8AQnPKnxZK7GgwTtaVqWHLfbO5YMc8dXluTTtMQmUNW33HFrOUldRETuXeRBRER2iy1NVdV1F3lWVdWtIqnMkPb2ZC4ugqxIctN3kpAnyHgS8gQRTwKeIMqRy7OzUw9S40YJAFh1kcckSZLkfmmfl++QA0sajcaaJe+NaRYtpfDr1RcvIIi8tuVsDUuQ8STkCTKehDzBYExGxpjNvfnAkXj8ie/wzz9RVX1JxxkAeLKvXaRZHN+5vRtco5zcNxyZqfEiFZ4Ua/xIhSeFGk9SFZEjVX0VkcN+v99R1Q0RKZno5+rr2Ybd8h/BJ7nhSe9HyK/7YtVYdWiMaY3F6MIYU2a6fqtvtoYkC2rA14CvAV/jsZ/2k2liP4KSe3/5ST1N0zS9Zkjo/G/pTsaTkCeIeBLwBBFPAp4g4kmNJzjhSY0nuP2rj9gkHZ7c8WQlpgm6PKnyBE2eVHiCjCfhB4/kuLSh1hUaAAAAAElFTkSuQmCC)
      50% no-repeat;
  }
</style>
