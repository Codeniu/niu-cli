<template>
  <div class="navbar">
    <div class="navbar-bg"></div>
    <div class="navbar-wrap">
      <div class="navbar-wrap-bg"></div>

      <div class="navbar-wrap-menu">
        <div
          class="menu-item"
          v-for="item in menus"
          :key="item.link"
          @click="linkTo(item)"
        >
          <!-- <SvgIcon :name="item.icon" size="48" class="menu-item__icon" /> -->
          <img :src="item.icon" size="48" class="menu-item__icon" />
          <div class="menu-item__info">
            <span class="menu-item__info-name">
              {{ item.name }}
            </span>
            <span class="menu-item__info-subname">
              {{ item.subname }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Peixun from '../assets/icons/class-peixun.svg'
import Upload from '../assets/icons/class-upload.svg'
import User from '../assets/icons/class-user.svg'
import Video from '../assets/icons/class-video.svg'

const menus = [
  {
    name: '培训填报',
    subname: 'TRAINING FILLING',
    icon: Peixun,
    link: '培训填报'
  },
  {
    name: '视频课程',
    subname: 'VIDEO COURSE',
    icon: Video,
    link: '视频课程'
  },
  {
    name: '视频上传',
    subname: 'VIDEO UPLOAD',
    icon: Upload,
    link: '视频上传'
  },
  {
    name: '我的填报',
    subname: 'MY REPLY',
    icon: User,
    link: '我的填报'
  }
]

function linkTo(item: any) {
  alert(item.link)
}
</script>

<style lang="less" scoped>
.navbar {
  position: relative;
  margin-bottom: 65px; // 55+10
  min-width: 1280px;

  &-bg {
    height: 240px;
    margin: 0 auto;
    background-size: cover;
    background-image: url('../assets/images/nav/classroom.png');
    background-repeat: no-repeat;
    background-position: right;
  }

  &-wrap {
    width: 100%;
    height: 110px;
    position: absolute;
    bottom: -55px;
    left: 0;
    z-index: 1;

    &-bg {
      display: block;
      position: absolute;
      width: 850px;
      height: 75px;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 4px;
      background-color: #ffffff3b;
      z-index: -1;
    }

    &-menu {
      display: flex;
      justify-content: space-around;
      width: 800px;
      margin: 0 auto;
      padding: 26px 40px 36px;
      background-color: #fff;
      border-radius: 4px;
    }
  }

  .menu-item {
    display: flex;
    align-items: center;
    cursor: pointer;

    &__icon {
      width: 48px;
      height: 48px;
    }

    &__info {
      margin-left: 4px;
      display: flex;
      flex-direction: column;

      &-name {
        font-size: 14px;
        color: #333;
        font-weight: 500;
      }
      &-subname {
        font-size: 10px;
        color: #ccc;
      }
    }
  }
}
</style>
