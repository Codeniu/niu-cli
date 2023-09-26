# EmojiSelect

## 表情输入框

表情输入框

### Example

<Wrap>
  <EmojiSelect />
</Wrap>

### Code

```vue
<template>
  <div class="app-container">
    <EmojiSelect @choseEmoji="onChoseEmoji" :style="{ fontSize: '16px' }" />
  </div>
</template>

<script>
import EmojiSelect from './EmojiSelect/index.vue'
export default {
  methods: {
    onChoseEmoji(emoji) {
      console.log('emoji: ', emoji)
    }
  }
}
</script>

<style lang="scss" scoped></style>

```

### 数据

- emoji-compact-all.json 压缩后的
- emoji-compact.json 常用的
- emoji.json 完整数据，带有表情名称及缩写
