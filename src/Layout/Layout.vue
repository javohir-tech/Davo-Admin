<template>
    <a-layout has-sider>
        <a-layout-sider class="layout-sider" v-model:collapsed="collapsed" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item v-for="link in layoutLink" :key="link.id" @click="goRoute(link.path)">
                    <template #icon>
                        <component :is="Icons[link.icon]" class="icons" />
                    </template>
                    <span class="nav-text">{{ link.name }}</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout :class="collapsed ? 'layout-collapsed' : 'layout'">
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
//Vue Router
import { useRouter } from 'vue-router';
//Links
import layoutLink from '@/Links/layoutLinks.json'
//Antd Icons
import { FundProjectionScreenOutlined, MedicineBoxOutlined, IdcardOutlined, UserOutlined, ReadOutlined, NodeIndexOutlined } from '@ant-design/icons-vue'

const router = useRouter()

const Icons = { FundProjectionScreenOutlined, MedicineBoxOutlined, IdcardOutlined, UserOutlined, ReadOutlined, NodeIndexOutlined }

const selectedKeys = ref([1]);
const collapsed = ref(false);

const goRoute = (path) => {
    router.push(path)
}

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

.layout-collapsed {
    margin-left: 80px;
}

:deep(.layout) {
    margin-left: 200px;
}

:deep(.layout-collapsed) {
    margin-left: 80px;
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

:deep(.icons) {
    font-size: 18px !important;
}
</style>