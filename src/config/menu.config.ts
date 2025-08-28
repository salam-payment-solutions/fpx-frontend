export const menuList: MenuList[] = [
    {
        title: 'Home',
        icon: 'bg-home',
        path: '/',
    },
    {
        title: 'Payment',
        icon: 'bg-banknotes',
        path: '/payment',
    },
]

export interface MenuList {
    title: string
    icon?: string
    path: string
    children?: MenuList[]
}
