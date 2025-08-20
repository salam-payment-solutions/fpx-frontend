import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/return',
            name: 'return to receipt',
            redirect: '/receipt',
        },
        {
            path: '/receipt',
            name: 'receipt',
            component: () => import('../views/ReceiptView.vue'),
            props: (route) => ({ query: route.query }),
        },
        {
            path: '/:billId',
            name: 'bill',
            component: () => import('../views/BillView.vue'),
        },
    ],
})

export default router
