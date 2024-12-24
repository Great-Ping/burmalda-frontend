import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/signup'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/LoginPage.vue'),
    },
    {
      path: "/home",
      component: () => import('@/pages/home/HomePage.vue')
    },
    {
      path: "/auction-create",
      component: () => import('@/pages/auction-create/AuctionCreatePage.vue')
    },
    {
      path: "/auction/:id",
      component: () => import('@/pages/auction/AuctionPage.vue')
    }
  ],
})

export default router
