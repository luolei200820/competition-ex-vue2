import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/dashboard',
      component: DashboardView,
      children: [
        {
          path: 'user',
          name: "user",
          component: () => import('@/views/UserView.vue'),
        },
        {
          path:'tool',
          component: () => import('@/views/ToolView.vue'),
        }
      ]
    }
  ]
})

export default router
