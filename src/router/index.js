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
      component: () => import('@/Layout/Layout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/Home.vue')
        },
        {
          path: 'medicines',
          component: () => import('@/views/Medicines.vue')
        },
        {
          path: 'doctors',
          component: () => import('@/views/Doctors.vue')
        },
        {
          path: 'users',
          component: () => import('@/views/Users.vue')
        },
        {
          path: 'articles',
          component: () => import('@/views/Articles.vue')
        },
        {
          path: 'services',
          component: () => import('@/views/Services.vue')
        }
      ]
    }
  ],
})

export default router
