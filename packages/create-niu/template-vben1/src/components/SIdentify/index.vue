<template>
  <div class="get-code" title="刷新" @click="refreshCode()">
    <s-identify :identify-code="identifyCode" />
  </div>
</template>

<script>
  import SIdentify from './SIdentify.vue'
  export default {
    components: { SIdentify },

    data() {
      return {
        identifyCode: '',
        identifyCodes: '0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ', // 绘制的随机数
      }
    },

    created() {
      this.refreshCode()
    },

    methods: {
      refreshCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
        this.$emit('change', this.identifyCode)
      },
      randomNum(min, max) {
        max = max + 1
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 随机生成验证码字符串
      makeCode(data, len) {
        for (let i = 0; i < len; i++) {
          this.identifyCode += data[this.randomNum(0, data.length - 1)]
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .get-code {
    cursor: pointer;
  }
</style>
