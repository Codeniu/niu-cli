<template>
  <Wrap>
    <Comment
      v-for="item in commentsList"
      :key="item.id"
      :info="item"
      @change="commentChange"
    />
  </Wrap>
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
