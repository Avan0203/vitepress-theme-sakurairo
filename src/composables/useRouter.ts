/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2024-03-05 15:49:00
 * @LastEditors: wuyifan 1208097313@qq.com
 * @LastEditTime: 2024-03-08 00:35:50
 * @FilePath: /vuepress-interview/src/composables/useRouter.ts
 * Copyright (c) 2024 by wuyifan0203 email: 1208097313@qq.com, All Rights Reserved.
 */
import { useRouter } from 'vitepress';
import { watch, onMounted } from 'vue';

const beforeCallbackList: Function[] = [];
let beforeHookInitialized = false;

const useBeforeRouterChange = (callback: Function) => {
    beforeCallbackList.push(callback);
    
    if (!beforeHookInitialized) {
        beforeHookInitialized = true;
        const router = useRouter();
        const cacheBeforeChange = router.onBeforeRouteChange;
        
        router.onBeforeRouteChange = async (to: string) => {
            // 执行所有注册的回调
            for (const callback of beforeCallbackList) {
                try {
                    await callback(to);
                } catch (error) {
                    console.error('Error in beforeRouteChange callback:', error);
                }
            }
            // 执行原始钩子
            cacheBeforeChange && cacheBeforeChange(to);
        }
    }
}

const afterCallbackList: Function[] = [];
let afterWatchInitialized = false;
let routerInstance: any = null;

const initRouteWatcher = () => {
    if (afterWatchInitialized || !routerInstance) return;
    
    console.log('Initializing route watcher...');
    afterWatchInitialized = true;
    
    // 使用 watch 监听 route.path 变化
    watch(
        () => routerInstance.route.path,
        async (newPath, oldPath) => {
            // 跳过初始加载（oldPath 为空字符串）
            if (!oldPath) {
                console.log('Initial load, skip callback execution');
                return;
            }
            
            console.log('=== Route changed ===');
            console.log('From:', oldPath, 'To:', newPath);
            console.log('Callbacks count:', afterCallbackList.length);
            
            // 执行所有注册的回调
            for (let i = 0; i < afterCallbackList.length; i++) {
                const cb = afterCallbackList[i];
                try {
                    console.log(`Executing callback [${i}]:`, cb.name || 'anonymous');
                    await cb(newPath);
                    console.log(`Callback [${i}] completed`);
                } catch (error) {
                    console.error(`Error in callback [${i}]:`, error);
                }
            }
            
            console.log('All callbacks executed');
        }
    );
    
    console.log('Route watcher initialized successfully');
};

const useAfterRouterChange = (callback: Function) => {
    afterCallbackList.push(callback);
    console.log('Registered after route change callback, total:', afterCallbackList.length);
    
    // 获取 router 实例
    if (!routerInstance) {
        routerInstance = useRouter();
    }
    
    // 在 onMounted 中初始化 watch，确保在正确的 Vue 上下文中
    if (typeof window !== 'undefined') {
        onMounted(() => {
            initRouteWatcher();
        });
    }
}

export { useBeforeRouterChange, useAfterRouterChange }
