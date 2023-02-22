# PicWrap

图片等比缩放容器

当页面宽度变化时,图片大小等比缩放

## Example

<Wrap>
  <NPicWrap />
</Wrap>

改变浏览器窗口宽度试试效果吧

## 解析

核心代码如下,高宽比：0.65

``` css
&-cover {
  padding-bottom: 65%;
}
```

## 源码

```vue
<template>
  <ul class="card-wrapper" v-if="list.length > 0">
    <li v-for="item in list" :key="item.id">
      <div class="classcard">
        <div class="classcard-cover">
          <div class="item">
            <img :src="item.coverImage" alt="课程封面" />
          </div>
        </div>
        <div class="classcard-bottom">其他信息</div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref<any>([
  {
    id: 1,
    coverImage:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb4026c3cb354ea498a8ada02cf3115f~tplv-k3u1fbpfcp-no-mark:460:460:460:270.awebp?'
  },
  {
    id: 2,
    coverImage:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb4026c3cb354ea498a8ada02cf3115f~tplv-k3u1fbpfcp-no-mark:460:460:460:270.awebp?'
  },
  {
    id: 3,
    coverImage:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb4026c3cb354ea498a8ada02cf3115f~tplv-k3u1fbpfcp-no-mark:460:460:460:270.awebp?'
  },
  {
    id: 4,
    coverImage:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb4026c3cb354ea498a8ada02cf3115f~tplv-k3u1fbpfcp-no-mark:460:460:460:270.awebp?'
  }
])
</script>

<style lang="less" scoped>
.card-wrapper {
  display: flex;
  flex-wrap: wrap;

  ul {
    padding: 0;
  }

  li {
    cursor: pointer;
    margin: 0 7px 20px;
    width: calc(100% / 4 - 14px);
    list-style: none;
  }
}

.classcard {
  display: inline-block;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 6px 6px 0 0;

  &-cover {
    width: 100%;
    padding-bottom: 65%;
    height: 0;
    position: relative;

    .item {
      width: 100%;
      height: 100%;
      position: absolute;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }
  }
}
</style>

```
