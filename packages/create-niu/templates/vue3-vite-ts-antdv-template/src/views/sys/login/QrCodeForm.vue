<template>
  <div v-show="getShow">
    <div class="type" @click="toLoginForm"></div>
    <h1 class="text-gray-600 text-center">企业微信扫描登录</h1>
    <div id="qr_code"></div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, unref } from 'vue'
  import { LoginStateEnum, useLoginState } from './useLogin'

  const { getLoginState, setLoginState } = useLoginState()
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE)
  const toLoginForm = () => {
    setLoginState(LoginStateEnum.LOGIN)
  }

  const aliyunAppConfig = {
    appid: 'ww7f39f68f9ad99df8',
    agentid: '1000004',
    redirect_uri: 'http://www.test.fun/admin/#/login',
    state: '1',
    wwLoginSrc: '//rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js',
  }
  const prodAppConfig = {
    appid: 'ww04440468ac571d2c',
    agentid: '1000018',
    redirect_uri: 'http://<your ip>/admin/#/login',
    state: '1',
    wwLoginSrc: 'https://qywx.hatic.com:10443/js/sso/wwLogin-1.0.0.js',
  }
  const staging = {
    appid: 'ww7f39f68f9ad99df8',
    agentid: '1000004',
    redirect_uri: 'http://www.srwzsyzy.fun/admindev/#/login',
    state: '1',
    wwLoginSrc: '//rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js',
  }

  const configMap: { [key: string]: any } = {
    development: aliyunAppConfig,
    staging: staging,
    production: prodAppConfig,
  }

  const { MODE } = import.meta.env

  const app = configMap[MODE]

  onMounted(async () => {
    await new Promise((resolve, reject) => {
      // @see: https://stackoverflow.com/questions/8578617
      let scriptEle = document.createElement('script')
      scriptEle.type = 'text/javascript'
      scriptEle.async = false
      scriptEle.src = app.wwLoginSrc
      scriptEle.onload = resolve
      scriptEle.addEventListener('load', resolve)
      scriptEle.addEventListener('error', (e) => reject(e.error))
      document.head.appendChild(scriptEle)
    })
    // @ts-ignore
    new window.WwLogin({
      id: 'qr_code',
      appid: app.appid,
      agentid: app.agentid,
      redirect_uri: encodeURIComponent(app.redirect_uri),
      state: app.state,
    })
  })
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
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAHlBMVEVHcEz///+LrOuFq+eGq+eGqueHrOiFqub////C1PLgc7nMAAAAB3RSTlMAgB7rl81ZAcX/fAAAAXZJREFUWMOV1jFqw0AQRuEhhNR7BENC0psEt8ZNDpDCbcgRYpupp/vnBLpuCslysLRavek/niQGNFbsNi9f3piPg5nFTTz6itmb6ZY5riEXMwWKuO9NY+bNTz/WmNed/5rGzKdvrTnPfjaNmaN/t8mTX0xjZuebNnnwk2nMuNuKcTeNGUT6DCPBiQonwYnKSOqrckeCExVOghMVToITdZwkJ+o4SU6uC01IcDIsNCLBSb/QjAQnKpwEJyqcBCfqOElO6pk6SU6qmQWSnNQySyQ5qWQWSXIyn1kmyclspkGSE5Xmj28ywUkts0SCk/nM9ewBmeG4IpnhhAOZ4VCsT1c7R+uTlaMXZvYNkrMHvJqZyTdQMwOJOk6Sk+tlQ0hyMlw2iCQn04Vuk+BkkhHPrCD9Qr9vCOkXektInzkjku7uJ0TUcZL4waSOvr6U8CPfrcBaEpz8y4hnxDPiGfGMeEY8I54Rz4hnxDPiGfGMeEY8I54Rz2ASfzwte7EhQL3+AAAAAElFTkSuQmCC)
      50% no-repeat;
  }
</style>
