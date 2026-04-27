<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-02-21 15:06:46
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2026-04-27 11:41:48
 * @FilePath: \vitepress-theme-sakurairo\src\layout\Article.vue
 * Copyright (c) 2024 by wuyifan0203 email: 1208097313@qq.com, All Rights Reserved.
-->
<template>
    <div class="article-wrapper">
        <div class="article-head">
            <div class="article-cover" :style="{
                backgroundImage: `url(${pageData.cover})`
            }"></div>
            <header>
                <h1 class="entry-title">{{ pageData.title }}</h1>
                <span class="topic-line"></span>
                <p class="entry-census">
                    <span>
                        <a href="" @click="() => alertMessage('欢迎贡献代码')">
                            <img v-lazy="theme.global.avatar" alt="">
                        </a>
                    </span>
                    <span>
                        <a href="">
                            {{ theme.global.author }}
                        </a>
                    </span>
                    <span class="bull">·</span>
                    {{ pageData.publish }}
                    <span class="bull">·</span>
                    {{ pageData.pageViews }} 次阅读
                </p>
            </header>
        </div>
        <div class="article-content clearfix" ref="articleRef">
            <main>
                <article class="article-body">
                    <Content />
                </article>
                <ArticleCatalog class="article-catalog" ref="catalogRef"></ArticleCatalog>
                <ArticleFooter :page="pageData"></ArticleFooter>
                <Pagination class="footer-pagination" :page="pageData"></Pagination>
            </main>
        </div>
        <CommentBoard class="comment-board" :page="pageData" v-if="useComment"></CommentBoard>
    </div>
</template>

<script setup lang="ts">
import { Content, useData, withBase, } from 'vitepress';
import { ComputedRef, computed, nextTick, onMounted, ref } from 'vue';
import { DefaultPageFormatter, Theme } from '../types';
import Pagination from '../components/Pagination.vue';
import ArticleFooter from '../components/ArticleFooter.vue';
import CommentBoard from '../components/CommentBoard.vue';
import ArticleCatalog from '../components/ArticleCatalog.vue';
import { useAfterRouterChange } from '../composables/useRouter';
import { useStore, alertMessage } from '../utils';
import { getPageViews } from '../api';

const globalStore = useStore('global')
const data = computed(() => globalStore.getData());

const articleRef = ref<HTMLElement>();
const catalogRef = ref();
const { page } = useData();
const theme = useData().theme.value as Theme;

const layout = computed(() => page.value.frontmatter.layout)

onMounted(() => {
    useAfterRouterChange(updateTocHeight);
    useAfterRouterChange(updatePageViews);
})

const updatePageViews = async () => {
    if (layout.value === 'page' && pageData.value?.url) {
        try {
            const res = await getPageViews(theme.global.comments.serverURL, [withBase(pageData.value.url)]);
            console.log('updatePageViews', res);
            // FIXME: 这里需要处理一下，因为返回的数据格式有时候是数组，有时候不是
            pageData.value.pageViews = Array.isArray(res) ? res[0]['time'] : res['time'];
        } catch (error) {
            console.error('get page views fail', error);
        }
    }
}

const updateTocHeight = () => {
    if (layout.value === 'page') {
        nextTick(() => {
            if (articleRef.value && catalogRef.value) {
                let height = articleRef.value.clientHeight;

                if (typeof catalogRef.value.updateHeight === 'function') {
                    catalogRef.value.updateHeight(height);
                } else {
                    console.error('catalogRef.updateHeight is not a function');
                }

                if (typeof catalogRef.value.refresh === 'function') {
                    catalogRef.value.refresh();
                    console.log('refresh called');
                } else {
                    console.error('catalogRef.refresh is not a function');
                }
            } else {
                console.warn('set tocbot height fail!');
            }
        });
    } else {
        console.log('Layout is not page, skip updateTocHeight');
    }
}

// 以url为key获取文章信息
const pageData: ComputedRef<DefaultPageFormatter> = computed(() => {
    let filePath = page.value.filePath;
    filePath = filePath.replace(/\.md$/, '');
    filePath = '/' + filePath;
    return data.value.find((page: DefaultPageFormatter) => page.key === filePath)
});

const useComment = computed(() => {
    const scopeTheme = theme;
    return scopeTheme.global.comments.enable && pageData.value.comment;
})

</script>
<style lang="scss">
@import "../styles/variable.scss";
@import "../styles/animate.scss";
@import "../styles/common.scss";

.article-wrapper {
    animation: blur .8s;
    animation-duration: .8s;
    background-color: rgb(255 255 255 / 80%);
    transition: all .8s ease !important;

    .article-head {
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
        width: 100%;
        border-radius: 0 0 20px 20px;
        transition: all .8s ease !important;
        animation: blur .8s;

        .article-cover {
            width: 100%;
            height: 400px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            background-origin: border-box;
        }

        &>header {
            position: absolute;
            inset: auto 0 20px;
            z-index: 1;
            padding: 0 10px;
            margin-right: auto;
            margin-left: auto;
            max-width: 800px;
            text-align: left;
            color: #fff;

            .entry-title {
                padding: 0;
                margin: 0;
                width: 100%;
                font-size: 32px;
                border: 0;
                font-weight: $--global-font-weight;
                animation: fadeInUp 2s;
            }

            .topic-line {
                position: relative;
                bottom: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 2px;
                background-color: #fff;
                animation: lineWidth 2.5s;
                animation-fill-mode: forwards;
            }

            .entry-census {
                padding: 18px 0 0;
                margin: 0;
                font-size: 14px;
                color: #fff;
                line-height: 39px;
                font-weight: $--global-font-weight;
                animation: fadeInDown 2s;

                a {
                    animation: fadeInDown 2s;

                    img {
                        float: left;
                        margin-right: 12px;
                        width: 35px;
                        height: 35px;
                        border-radius: 100%;
                    }
                }

                .bull {
                    margin: 0 5px;
                }
            }
        }
    }

    .article-content,
    .comment-board {
        padding: 0 10px;
        margin-right: auto;
        margin-left: auto;
        max-width: 800px;

        main {
            padding: 7.5% 0 0;

            .article-catalog {
                position: absolute !important;
                top: 480px;
                right: calc((100% - 950px - 250px) / 2);
                z-index: 10;
                padding-top: 10px;
                padding-bottom: 10px;
                width: 200px;
                height: 100%;
                background-color: rgb(255 255 255 / 0%);
                transform: translateX(0);
            }
        }
    }

    .comment-board {
        margin-top: 20px;
    }

}

.article-body {
    &>a {
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    img,
    video {
        width: 100%;
        max-width: 100%;
        height: auto;
    }

    ol li,
    ul li {
        padding: 15px 0 0;
        text-align: left;
    }

    h3,
    h4,
    h5 {
        padding-left: 16px;
    }

    h3 {
        padding-bottom: 10px;
    }

    h3::after,
    h4::after,
    h5::after {
        position: absolute;
        left: 0;
    }

    h2::after {
        content: "\00B6";
        position: absolute;
        padding-left: 6px;
        font-size: 1.03em;
    }

    h3::after {
        content: "#";
    }

    h3::before {
        display: block;
        margin-top: -80px;
        height: 80px;
        visibility: hidden;
        content: " ";
    }

    h4::after {
        content: ">";
    }

    h5::after {
        content: "~";
    }


    ul,
    ol {
        padding: 15px 10px 30px 50px;
        margin-left: 0;
        color: #616161;
        border: 1px solid #FFF;
        border-radius: 10px;
    }

    ol {
        list-style: decimal;
    }

    ul {
        list-style: disc;
    }

    p {
        color: #797979;
        line-height: 30px;
    }

    hr {
        display: block;
        margin-top: 40px;
        margin-bottom: 40px;
        text-align: center;
        background: 0 0;
        border: 0;
    }

    hr::before {
        position: relative;
        top: -30px;
        display: inline-block;
        margin-left: .6em;
        font-size: 28px;
        color: rgb(0 0 0 / 80%);
        content: '...';
        letter-spacing: .6em;
    }

    blockquote {
        position: relative;
        padding: 30px 60px;
        margin: 0;
    }

    blockquote::before {
        position: absolute;
        top: -25px;
        left: 12px;
        font-size: 3rem;
        /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
        font-family: FontAwesome;
        color: orange;
        content: "\f10d" !important;
    }

    blockquote::after {
        position: absolute;
        right: -5px;
        bottom: -25px;
        font-size: 3rem;
        /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
        font-family: FontAwesome;
        color: orange;
        content: '\f10e' !important;
    }


    // code block;
    div[class*="language-"] {
        position: relative;
        display: flex;
        overflow: hidden;
        padding-top: 32px;
        font-size: var(--code-font-size);
        font-family: var(--code-font-family);
        background: var(--shiki-background);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        line-height: var(--code-line-height);
        flex-direction: row-reverse;

        button.copy {
            position: absolute;
            top: 8px;
            right: 8px;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-position: 50%;
            background-repeat: no-repeat;
            background-color: white;
            border: 1px solid var(--color-border);
            border-radius: 4px;
            opacity: 0;
            background-image: var(--vp-icon-copy);
        }

        &:hover button.copy {
            opacity: 1;
        }

        .lang {
            position: absolute;
            transform: translate(-50%, -28px);
            left: 50%;
            user-select: none;
        }

        pre {
            overflow: auto;
            padding-left: 16px;
            margin: 0;
            flex-grow: 1;
        }

        code {
            padding: 0;
            background-color: transparent;
        }

        .line-numbers-wrapper {
            padding-right: 5px;
            padding-left: 10px;
            color: #f6f8fa;
            border-right: 1px solid #f6f8fa;
        }

        &::before {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 32px;
            background: #f6f8fa;
            content: "";
            border-bottom: 1px solid var(--color-border);
        }

        &::after {
            position: absolute;
            top: 10px;
            left: 12px;
            width: 12px;
            height: 12px;
            background: #fc625d;
            border-radius: 50%;
            box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
            content: "";
        }
    }

    table {
        display: block;
        border-collapse: collapse;
        overflow-x: auto;
        margin: 20px 0;
    }


    th {
        font-size: 14px;
        font-weight: 600;
        color: rgb(60 60 67 / 78%);
        background-color: rgb(232 232 232 / 50%);
    }

    tr {
        background-color: rgb(255 255 255 / 50%);
        transition: background-color .5s;
        border-top: 1px solid#e2e2e3;

        &:nth-child(2n) {
            background-color: rgb(232 232 232 / 50%);
        }
    }

    th,
    td {
        padding: 8px 16px;
        border: 1px solid #e2e2e3;
    }

    td {
        font-size: 14px;
    }
}
</style>