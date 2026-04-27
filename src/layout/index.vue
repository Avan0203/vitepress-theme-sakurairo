<!--
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-02-10 20:22:24
 * @LastEditors: wuyifan0203 1208097313@qq.com
 * @LastEditTime: 2024-03-15 17:45:15
 * @FilePath: /vitepress-theme-sakurairo/src/layout/index.vue
-->
<template>
    <Header></Header>
    <Layout></Layout>
    <Footer></Footer>
    <BackTop></BackTop>
    <Skin></Skin>
</template>


<script setup lang='ts'>
import { useData } from "vitepress";
import { onMounted, provide, getCurrentInstance } from 'vue';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/regular.min.css';

import Header from '../components/Header.vue';
import Layout from './Layout.vue';
import Footer from '../components//Footer.vue';
import BackTop from '../components//BackTop.vue';
import Skin from '../components//Skin.vue';
import { installThemePlugin } from '../plugin';

import { data } from '../posts.data';
import { Theme } from "../types";
import { useStore } from "../utils";
import { mountStore } from "../store";
import lazyLoad from '../utils/lazyLoad'
const theme = useData().theme.value as Theme;

mountStore();

const instance = getCurrentInstance();
if (instance) {
    const app = instance.appContext.app;
    app.use(lazyLoad, { loading: theme.global.onLoadImage })
}

const global = useStore('global');
provide('global', global);
global.setData(data);

// 在脚本顶层立即初始化插件，确保路由钩子在应用启动时就设置好
installThemePlugin();

onMounted(() => {
    document.body.style.backgroundImage = `url(${theme.global.background?.src()})`;
})

</script>

<style lang="scss">
@import '../styles/theme.scss';
@import '../styles/variable.scss';

* {
    box-sizing: border-box;
}

a {
    text-decoration: none;
    color: $--theme-skin;
    background-color: transparent;
    outline: 0;
    transition: color .2s ease-out, border .2s ease-out, opacity .2s ease-out;
    word-break: break-word;

    &:hover {
        outline: 0;
    }
}

html {
    scroll-behavior: smooth;
}

body {
    padding: 0;
    margin: 0;
    font-size: 15px;
    /* stylelint-disable-next-line font-family-no-missing-generic-family-keyword */
    font-family: Moe-Mashiro;
    color: $--theme-skin;
    background: #0000;
    background-position: center;
    text-shadow: 0 0 1px rgb(0 0 0 / 10%);
    box-sizing: border-box;
    line-height: 1.5;
    background-attachment: fixed;

    @font-face {
        font-family: Moe-Mashiro;
        src: url('../assets/fonts/Moe-Mashiro.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }


    ol,
    ul {
        box-sizing: border-box;
    }

    ul,
    li {
        text-align: center;
    }

    h1::before {
        display: block;
        margin-top: -80px;
        height: 80px;
        visibility: hidden;
        content: " ";
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
        clear: both;
    }

}
</style>