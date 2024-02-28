<template>
    <div class="basic-divider">
        <div class="basic-divider-tag" v-if="!hidenTag"></div>
        <div class="basic-divider-title">{{ title }}</div>
        <!-- <div class="flex-1">
      <a-divider dashed style="border-color: #e6e6e6" />
    </div> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
defineComponent({
    name: "BasicDivider",
});
</script>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: "",
    },
    hidenTag: {
        type: Boolean,
        default: false,
    },
});
</script>

<style lang="less" scoped>
.basic-divider {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    // justify-content: space-between;

    &-tag {
        margin-right: 4px;
        width: 8px;
        height: 24px;
        background: linear-gradient(360deg, #10a0e9 0%, #19c4ab 100%);
    }

    &-title {
        font-size: 24px;
        font-weight: 500;
        color: #37ffe8;
    }
}
</style>
