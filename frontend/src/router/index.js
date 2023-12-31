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
          path: '',
          name: 'ProductList',
          component: () => import('../components/Home/ProductList.vue')
        },
        {
          path: 'search',
          name: 'SearchView',
          component: () => import('../components/Home/ProductList.vue')
        },
        {
          path: 'product/:id',
          name: 'ProductDetail',
          component: () => import('../components/Home/ProductDetail.vue')
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
      redirect: { name: 'ProductList' }
    }
  ]
})

export default router
