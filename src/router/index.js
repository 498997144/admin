import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login.vue')
const Home = () => import('../views/home/Home.vue')
const Welcome = () => import('../views/home/children/Welcome.vue')
const Users = () => import('../views/home/children/users/Users.vue')
const Power = () => import('../views/home/children/power/Power.vue')

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
                component: Users
            }, 
            {
                path: 'rights',
                name:'power',
                component: Power
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
    if (token && token != 'undefined' || to.path === '/login') {
        next()
    } else {
        next('/login')
    }
})

export default router
