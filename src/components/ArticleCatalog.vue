<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-03-05 14:33:33
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2026-04-27 11:45:49
 * @FilePath: \vitepress-theme-sakurairo\src\components\ArticleCatalog.vue
 * Copyright (c) 2024 by wuyifan0203 email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
    <div :style="{
        height: tocHeight
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
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
        headingsOffset: 100,
        scrollSmoothOffset: -100,
        collapseDepth: 0,
        scrollSmooth: true,
        // 启用滚动时更新 URL hash
        enableUrlHashUpdateOnScroll: true,
    })
})

defineExpose({
    refresh() {
        nextTick(() => {
            tocbot.refresh();
        })
    },
    updateHeight(height: number) {
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
    max-height: calc(100vh - 120px);

    &>.toc-list {
        li {
            list-style: none;
        }

        // tocbot 生成的列表样式
        .toc-list-item {
            margin: 5px 0;
        }

        .toc-link {
            text-decoration: none;
            color: #666;
            transition: all 0.3s ease;
            display: block;
            padding: 4px 0;

            &:hover {
                color: #ff7875;
            }
        }

        .is-active-link {
            color: #ff7875;
            font-weight: bold;
        }
    }
}
</style>