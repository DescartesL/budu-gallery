import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/article',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/article/index.vue')
    },{
      path: '/tiptap',
      name: 'tiptap',
      component: () => import('../views/tiptap/index.vue')
    },
    {
      path: '/tiptap2',
      name: 'tiptap2',
      component: () => import('../views/tiptap2/index.vue')
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
    }
  ]
})

export default router
