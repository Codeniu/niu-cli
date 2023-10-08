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

<script lang="ts" setup name="NPicWrap">
import { ref } from 'vue'

const list = ref<any>([
  {
    id: 1,
    coverImage: 'https://avatars.githubusercontent.com/u/28432016?v=4'
  },
  {
    id: 2,
    coverImage: 'https://avatars.githubusercontent.com/u/28432016?v=4'
  },
  {
    id: 3,
    coverImage: 'https://avatars.githubusercontent.com/u/28432016?v=4'
  },
  {
    id: 4,
    coverImage: 'https://avatars.githubusercontent.com/u/28432016?v=4'
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
