import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login.vue')
const Home = () => import('../views/home/Home.vue')

Vue.use(VueRouter)

  const routes = [
  {
	path: '/',
	redirect:'/login'
  },
  {
	path:'/login',
	name:'login',
	component:Login,
  },
  {
      path:'/home',
      name:'home',
      component:Home,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
    const token = sessionStorage.getItem('token')
    if(token && token != 'undefined' || to.path === '/login'){
        next()
    }
    else{
        next('/login')
    }
})

export default router
