<template>
  <div class="comment">
    <div class="comment-top">
      <div class="comment-top__avatar">
        <img v-if="info.avatar" :src="info.avatar" alt="头像" />
        <img
          v-else
          src="https://avatars.githubusercontent.com/u/28432016?v=4"
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
      flex: 1;
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

  .reply-wrap {
    margin-bottom: 40px;
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
