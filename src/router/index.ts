import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// 配置路由信息
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/home.vue'),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login.vue'),
  },

]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
