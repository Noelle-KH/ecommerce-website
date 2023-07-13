import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView.vue'
import StoreView from '../views/StoreView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'HomeView',
			component: HomeView
		},
		{
			path: '/cart',
			name: 'CartView',
			component: CartView
		},
		{
			path: '/store',
			name: 'StoreView',
			component: StoreView
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFound
		}
	]
})

export default router
