<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-03-05 14:33:33
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-05-28 10:02:03
 * @FilePath: /vitepress-theme-sakurairo/src/components/ArticleCatalog.vue
 * Copyright (c) 2024 by wuyifan0203 email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
    <div :style="{
        height:tocHeight
    }">
        <div id="toc-container">
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import tocbot from 'tocbot';

const tocHeight = ref('100px')

onMounted(() => {
    tocbot.init({
        tocSelector: '#toc-container',
        contentSelector: '.article-body',
        headingSelector: 'h1, h2, h3, h4, h5, h6',
        headingsOffset: 100,
        scrollSmoothOffset: -100,
        collapseDepth: 0,
        scrollSmooth: true,
    })
})

defineExpose({
    refresh(){
        nextTick(()=>{
            tocbot.refresh();
        })
    },
    updateHeight(height:number){
        tocHeight.value = height + 'px';
    }
})

onUnmounted(() => {
    tocbot.destroy();
})

</script>

<style lang="scss">
@import 'tocbot/src/scss/tocbot.scss';

#toc-container {
    position: sticky;
    top: 100px;

    &>.toc-list li {
        list-style: none;
    }
}
</style>