<template>
  <div class="workbench">
    <div class="first">
      <First />
    </div>
    <div class="second">
      <Second />
    </div>
    <div class="third">
      <Third />
    </div>
    <div class="four">4</div>
    <div class="five">5</div>
  </div>
</template>

<script lang="ts" setup>
  import First from './First.vue'
  import Second from './Second/index.vue'
  import Third from './Third/index.vue'
</script>

<style lang="less" scoped>
  .workbench {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    // grid-template-rows: 1fr 2fr 3fr;
    gap: 20px 20px;
    grid-auto-flow: row;
    grid-template-areas:
      'first first third'
      'second second third'
      'four five five';
  }

  .first {
    grid-area: first;
  }

  .second {
    grid-area: second;
  }

  .third {
    grid-area: third;
  }

  .four {
    grid-area: four;
    background-color: red;
  }

  .five {
    grid-area: five;
  }
</style>
