<template>
    <a-layout has-sider>
        <a-layout-sider class="layout-sider">
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item v-for="link in layoutLink" :key="link.id">
                    <span class="nav-text">{{ link.name }}</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout class="layout">
            <a-layout-header class="layout-header">
                <strong>Header</strong>
            </a-layout-header>
            <a-layout-content class="layout-content">
                <RouterView />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup>
import { ref } from 'vue';
//Links
import layoutLink from '@/Links/layoutLinks.json'
const selectedKeys = ref([1]);
</script>
<style scoped>
#components-layout-demo-fixed-sider .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
}

:deep(.layout-sider) {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0
}

:deep(.layout) {
    margin-left: 200px;
}

:deep(.layout-content) {
    margin: 24px 16px 0;
    overflow: initial;
    height: 100%;
}

:deep(.layout-header) {
    background: red;
    padding: 0
}
</style>