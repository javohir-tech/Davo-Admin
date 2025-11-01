//auth
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('@/Auth/Auth.vue')
    },
    {
      path: '/',
      // component : 
    }
  ],
})

export default router
