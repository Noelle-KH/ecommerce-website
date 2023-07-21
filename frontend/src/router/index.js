import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      children: [
        {
          path: '/search',
          name: 'SearchView',
          component: HomeView
        }
      ]
    },
    {
      path: '/cart',
      name: 'CartView',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/store',
      name: 'StoreView',
      component: () => import('../views/StoreView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'HomeView' }
    }
  ]
})

export default router
