<template>
  <div class="annotation">
    <img :src="image" />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import Difficult from '/@/assets/images/annotation/difficult.png'
  import Easy from '/@/assets/images/annotation/easy.png'
  import Normal from '/@/assets/images/annotation/normal.png'
  const IMAGES: { [key: string]: any } = {
    HARD: Difficult,
    EASY: Easy,
    MEDIUM: Normal,
  }
  export default defineComponent({
    name: 'TlAnnotation',

    props: {
      // 难易程度
      level: {
        type: String,
        default: 'HARD',
        validator: function (value: string) {
          return ['HARD', 'EASY', 'MEDIUM'].indexOf(value) !== -1
        },
      },
    },

    setup(props: { level: string }) {
      const image = computed(() => {
        return IMAGES[props.level] || IMAGES.HARD
      })

      return {
        image,
      }
    },
  })
</script>
<style lang="less" scoped>
  .annotation {
    position: relative;
    width: 30px;
    height: 48px;
    transform: rotate(-90deg);

    & > img {
      position: absolute;
      top: 6px;
      left: 8px;
      width: 48px;
      height: 100%;
    }
  }
</style>
