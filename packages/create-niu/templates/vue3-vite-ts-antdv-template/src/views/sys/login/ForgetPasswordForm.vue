<template>
  <div v-if="getShow">
    <h1 class="text-gray-600">重置密码</h1>
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
        />
      </a-form-item>
    </a-form>
    <a-button type="primary" @click="handleReset" size="large" class="w-full" :loading="loading"
      >重置</a-button
    >
    <a-button @click="setLoginState(LoginStateEnum.LOGIN)" size="large" class="w-full mt-20px"
      >返回</a-button
    >
  </div>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref, toRaw, unref } from 'vue'
  import { LoginStateEnum, useLoginState } from './useLogin'
  import { PageEnum } from '/@/enums/pageEnum'
  import { useGo } from '/@/hooks/web/usePage'

  const { getLoginState, setLoginState } = useLoginState()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD)

  const loading = ref<boolean>(false)
  const go = useGo()
  const formRef = ref()
  const formState = reactive({
    username: '',
    password: '',
  })
  const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  }
  const handleReset = () => {
    formRef.value.validate().then(async () => {
      loading.value = true
      console.log('请求', toRaw(formState))
      setTimeout(() => {
        loading.value = false
        go(PageEnum.BASE_HOME)
      }, 2000)
    })
  }
</script>
