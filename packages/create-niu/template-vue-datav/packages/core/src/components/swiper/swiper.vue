<template>
    <vue3-seamless-scroll
        :modelValue="scroll"
        :list="datas"
        :single-height="singleHeight"
        :single-wait-time="singleWaitTime"
        :limit-scroll-num="limitScrollNum"
        :step="2"
        :direction="direction">
        <slot></slot>
    </vue3-seamless-scroll>
</template>

<script setup lang="ts">
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

interface Props {
    scroll: boolean;
    datas: any[];
    singleHeight: number;
    singleWaitTime?: number;
    limitScrollNum?: number;
    direction?: "up" | "down" | "left" | "right";
}

withDefaults(defineProps<Props>(), {
    singleWaitTime: 3000,
    limitScrollNum: 10,
});
</script>

<style scoped lang="less"></style>
