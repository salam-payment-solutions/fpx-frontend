import { type RouteRecordRaw } from 'vue-router'

export const paymentRoutes: RouteRecordRaw[] = [
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
            {
                path: 'return',
                name: 'return to receipt',
                redirect: { name: 'payment receipt' },
            },
            {
                path: 'receipt',
                name: 'payment receipt',
                component: () => import('../views/Payments/ReceiptView.vue'),
            },
        ],
    },
]
