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
      component : ()=> import('@/Layout/Layout.vue'), 
      children:[
        {
          path : '', 
          component: ()=>import('@/views/Home.vue')
        }
      ]
    }
  ],
})

export default router
