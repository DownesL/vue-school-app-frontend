import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/messages',
      name: 'messages',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/MessagesView.vue')
    },
    {
      path: '/messages/:id',
      name: 'messageDetail',
      component: () => import('@/views/MessageDetailView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/password',
      name: 'password',
      component: () => import('@/views/PasswordView.vue')
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/GroupsView.vue')
    },
    {
      path: '/groups/:id',
      name: 'specificGroup',
      component: () => import('@/views/GroupsView.vue')
    },
    {
      path: '/organisations',
      name: 'organisations',
      component: () => import('@/views/OrganisationsView.vue')
    },
  ]
})

export default router
