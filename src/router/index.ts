import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { paymentRoutes } from './payment'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...paymentRoutes,
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
            path: '/receipt',
            name: 'receipt',
            component: () => import('../views/Payments/ReceiptView.vue'),
            props: (route) => ({ query: route.query }),
        },
        {
            path: '/fpx/stg/return',
            name: 'fpx return staging',
            component: () => import('../views/Payments/ReceiptView.vue'),
            props: (route) => ({ query: route.query }),
        },
        {
            path: '/fpx/stg/service',
            name: 'fpx service staging',
            component: () => import('../views/FpxStgServiceView.vue'),
            props: (route) => ({ query: route.query }),
        },
    ],
})

export default router
