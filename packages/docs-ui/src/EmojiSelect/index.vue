<template>
  <div class="app-container">
    <span class="emoji-trigger" @click="showPopver">😀</span>

    <div>
      <textarea
        v-model="comment"
        style="border: 1px solid #6e6e6e; width: 100%"
      />
    </div>

    <div v-show="isShow" trigger="click" style="border: 1px solid">
      <div class="emoji-wrap">
        <ul>
          <li
            class="emoji-item"
            v-for="item in emojis"
            :key="item"
            @click="handleEmoji(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import emojis from './emoji/emoji-compact.json'
export default {
  data() {
    return {
      emojis,
      isShow: false,
      comment: '请输入...'
    }
  },
  created() {},
  methods: {
    handleEmoji(emoji) {
      this.$emit('choseEmoji', emoji)
      this.comment += emoji
    },
    showPopver() {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="less" scoped>
.emoji-wrap {
  height: 300px;
  overflow: auto;
}
.emoji-item {
  display: inline-block;
  width: 40px;
  height: 41px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  transition: 0.1s;
  border-radius: 4px;
}

.emoji-item:hover {
  background-color: #e0f7f1;
  transition: 0.1s;
  transform: scale(1.1);
}

.emoji-trigger {
  padding: 2px;
  font-size: 24px;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    background-color: #e0f7f1;
    transition: 0.1s;
  }
}
</style>
