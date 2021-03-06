import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login.vue')

const Home = () => import('../views/home/Home.vue')

const Welcome = () => import('../views/home/children/Welcome.vue')

const Users = () => import('../views/home/children/users/Users.vue')

const Power = () => import('../views/home/children/power/Power.vue')
const Roles = () => import('../views/home/children/power/Roles.vue')

const Categories = () => import('../views/home/children/goods/Categories.vue')
const Params = () => import('../views/home/children/goods/Params.vue')
const Goodslist = () => import('../views/home/children/goods/Goodslist.vue')
const Addgoods = () => import('../components/content/goods/Addgoods.vue')

const Orders = () => import('../views/home/children/orders/Orders.vue')

const Reports = () => import('../views/home/children/reports/Reports.vue')

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        redirect: '/home/welcome',
        component: Home,
        children: [
            {
                path: 'welcome',
                name:'welcome',
                component: Welcome
            },
            {
                path: 'users',
                name: 'users',
                component: Users
            }, 
            {
                path: 'rights',
                name:'power',
                component: Power
            }, 
            {
                path: 'roles',
                name:'roles',
                component: Roles
            },
            {
                path: 'categories',
                name:'categories',
                component: Categories
            }, 
            {
                path: 'params',
                name:'params',
                component: Params
            }, 
            {
                path: 'goods',
                name:'goods',
                component: Goodslist
            }, 
            {
                path: 'addGoods',
                name:'add',
                component: Addgoods
            },
            {
                path: 'orders',
                name:'orders',
                component: Orders
            },
            {
                path: 'Reports',
                name:'reports',
                component: Reports
            },
        ],
    },

]

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'linkActiveClass',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('token')
    if (token && token != 'undefined' || to.path == '/login') {
        next()
    } else {
        next('/login')
    }
})

export default router
