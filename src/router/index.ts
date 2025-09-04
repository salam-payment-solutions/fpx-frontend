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
            path: '/payment',
            name: 'payment',
            children: [
                {
                    path: '',
                    name: 'payment listing',
                    component: () => import('../views/Payments/ListingView.vue'),
                },
                {
                    path: 'bill',
                    name: 'payment bill',
                    component: () => import('../views/Payments/BillView.vue'),
                },
            ],
        },
        {
            path: '/receipt',
            name: 'receipt',
            component: () => import('../views/ReceiptView.vue'),
            props: (route) => ({ query: route.query }),
        },
        {
            path: '/fpx/stg/return',
            name: 'fpx return staging',
            component: () => import('../views/ReceiptView.vue'),
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
