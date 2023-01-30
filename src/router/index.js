import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

const routes = [{
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [{
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'home',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: 'user',
        name: 'user',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "user" */ '../views/User.vue')
      },
      {
        path: 'mall',
        name: 'mall',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "user" */ '../views/Mall.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router