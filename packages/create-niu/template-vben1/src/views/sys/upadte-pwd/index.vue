<template>
  <div class="wrapper">
    <div class="form">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-form-item label="旧密码" name="oldPwd">
          <a-input v-model:value="formState.oldPwd" placeholder="请输入旧密码" />
        </a-form-item>
        <a-form-item label="新密码" name="pwd">
          <a-input v-model:value="formState.pwd" placeholder="请输入新密码" />
        </a-form-item>
        <a-form-item label="确认新密码" name="rePwd">
          <a-input v-model:value="formState.rePwd" placeholder="请确认新密码" />
        </a-form-item>
      </a-form>
      <div>
        <a-button @click="onCancel" type="link">去首页</a-button>
        <a-button :loading="confirmLoading" type="primary" @click="onSubmit">确认修改</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { doEncrypt } from '/@/utils/encrypt'
  import { router } from '/@/router'
  import { editPassword } from '/@/apis/sys/login'

  const { createMessage } = useMessage()

  // modal
  const confirmLoading = ref<boolean>(false)
  async function onSubmit() {
    const data = await formRef.value.validate()
    if (!data) return

    if (formState.pwd !== formState.rePwd) {
      createMessage.warning('两次密码不一致')
      return
    }

    try {
      confirmLoading.value = true
      const formData = new FormData()
      formData.append('oldPwd', doEncrypt(formState.oldPwd) || '')
      formData.append('newPwd', doEncrypt(formState.pwd) || '')
      await editPassword(formData)
      createMessage.success('修改成功')
      router.push('/login')
    } catch (error) {
      console.log(error)
    } finally {
      confirmLoading.value = false
    }
  }
  function onCancel() {
    formState.pwd = ''
    formState.rePwd = ''
    router.push('/login')
  }

  // form
  const formRef = ref()
  const formState = reactive<any>({
    pwd: '',
    rePwd: '',
    oldPwd: '',
  })
  let ckeckPassword = async (rule: any, value: string) => {
    const partten = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    if (value === '') {
      return Promise.reject('请输入密码')
    } else if (!partten.test(value)) {
      return Promise.reject('至少包括数字，大写。小写，特殊字符三种字符的组合')
    } else {
      return Promise.resolve()
    }
  }
  let validatePass2 = async (rule: any, value: string) => {
    if (value === '') {
      return Promise.reject('请确认新密码')
    } else if (value !== formState.pwd) {
      return Promise.reject('两次密码不一致')
    } else {
      return Promise.resolve()
    }
  }
  const rules = ref<any>({
    pwd: [{ required: true, validator: ckeckPassword, trigger: 'blur' }],
    oldPwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
    rePwd: [{ required: true, validator: validatePass2, trigger: 'blur' }],
  })
</script>

<style lang="less" scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    padding-top: 100px;
    position: relative;

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
  }

  .form {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -30%);
    width: 800px;
    background-color: #fff;
    padding: 40px;
    text-align: center;
    border-radius: 8px;
  }
</style>
