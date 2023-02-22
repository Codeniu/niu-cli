# 评论列表

## Example

<Comment />
<details>
  <summary>查看代码</summary>
  
  ```vue
  <template>
    <div>
      <Comment
        v-for="item in commentsList"
        :key="item.id"
        :info="item"
        @change="commentChange"
      />
    </div>
  </template>

  <script lang="ts" setup>
  import Comment from './Comment.vue'
  const commentsList = [
    {
      id: 1,
      name: '张三',
      pushTime: '2023-01-12',
      content: '新年快乐',
      children: [
        {
          id: 11,
          name: '张三1',
          pushTime: '2023-01-12',
          content: '兔年吉祥',
          avatar: ''
        },
        {
          id: 12,
          name: '张三2',
          pushTime: '2023-01-12',
          content: '兔年吉祥',
          avatar: ''
        }
      ],
      avatar: ''
    },
    {
      id: 2,
      name: '张三',
      pushTime: '2023-01-12',
      content: '新年快乐',
      children: [],
      avatar: ''
    }
  ]

  function commentChange() {
    console.log('123')
  }
  </script>

  <style lang="less" scoped></style>

  ```

</details>

## 源码

输入框可以切更改为对应的ui组件

`Comment.vue`

```vue
<template>
  <div class="comment">
    <div class="comment-top">
      <div class="comment-top__avatar">
        <img v-if="info.avatar" :src="info.avatar" alt="头像" />
        <img
          v-else
          src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb4026c3cb354ea498a8ada02cf3115f~tplv-k3u1fbpfcp-no-mark:460:460:460:270.awebp?"
          alt="头像"
        />
      </div>
      <div class="comment-top__info">
        <section class="comment-top__info-name">
          <span>{{ info.name }}</span>
          <span>{{ info.pushTime }}</span>
        </section>
        <span
          class="comment-top__info-btn"
          :class="{ 'comment-top__info-btn--active': showComment }"
          @click="handleShowComment"
        >
          {{ showComment ? '取消' : '回复' }}
        </span>
      </div>
    </div>

    <div class="comment-content">
      {{ info.content }}
    </div>

    <div v-if="showComment" class="reply-wrap clearfix">
      <input
        v-model="comments"
        placeholder="输入你的评论"
        style="border: 1px solid; width: 100%"
      />
      <button style="margin-top: 10px; float: right" @click="handlePushComment">
        发送
      </button>
    </div>

    <template v-if="info.children.length > 0">
      <div class="reply-list" v-for="item in info.children" :key="item.id">
        <div class="comment-top__name">{{ item.name }}:</div>
        <div class="reply-content">
          {{ item.content }}
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  info: {
    type: Object,
    default: () => {}
  }
})

const showComment = ref(false)
const comments = ref('')

async function handlePushComment() {
  // TODO 提交请求

  showComment.value = false
  comments.value = ''

  // $emit('change')
}

function handleShowComment() {
  showComment.value = !showComment.value
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 30px;
  border-radius: 4px;

  &-top {
    display: flex;

    &__avatar {
      width: 40px;
      height: 40px;
      margin-right: 6px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    &__name {
      font-size: 14px;
      margin-right: 4px;
    }

    &__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      color: #666;
      font-size: 14px;

      &-name {
        display: flex;
        flex-direction: column;

        & > span:last-child {
          color: #999;
          font-size: 12px;
        }
      }

      &-btn {
        cursor: pointer;

        &:hover {
          color: #28827c;
        }
      }

      &-btn--active {
        color: #28827c;
      }
    }
  }

  &-content {
    margin: 10px 0;
    color: #333;
    font-size: 14px;
  }

  .reply-list {
    margin-top: 10px;
    padding: 10px;
    display: flex;
    background-color: #f9f9f9;
  }

  .reply-content {
    flex: 1;
    font-size: 14px;
    color: #666;
  }
}
</style>

```
