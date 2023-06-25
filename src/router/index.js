import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/calendar/index.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/menu/index.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/calendar/index.vue')
    },
    {
      path: '/pictures',
      name: 'pictures',
      component: () => import('../views/pictures/index.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/gallery/index.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('../views/article/index.vue')
    }
  ]
})

export default router
