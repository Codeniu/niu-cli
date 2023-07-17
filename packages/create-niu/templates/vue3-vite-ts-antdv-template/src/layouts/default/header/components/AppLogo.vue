<template>
  <div @click="goHome" class="instudio-app-logo">
    <img :src="LOGO" />
    <div class="instudio-app-logo__divider"></div>
    <div class="instudio-app-logo__title">
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PageEnum } from '/@/enums/pageEnum'
  import { useGo } from '/@/hooks/web/usePage'
  import LOGO from '/@/assets/icons/logo.svg'

  const title = 'XX-PROJECT-TEMPLATE'
  const go = useGo()
  function goHome() {
    go(PageEnum.BASE_HOME)
  }
</script>
<style lang="less" scoped>
  .instudio-app-logo {
    display: flex;
    align-items: center;
    padding-right: 20px;
    cursor: pointer;

    & > img {
      // width: 260px;
      height: 48px;
    }

    &__title {
      margin-left: 14px;
      font-size: 24px;
      font-weight: 500;
      line-height: normal;
    }

    &__divider {
      width: 1px;
      height: 48px;
      background-color: #fff;
      margin: 0 4px;
    }
  }
</style>
