import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/composables/authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue')
      // meta: {requireAuth: false},
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/views/MessagesView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/messages/:id(\\d+)',
      name: 'messageDetail',
      props: true,
      component: () => import('@/views/MessageDetailView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountsView.vue'),
      meta: { requireAuth: true }
    },
    {
        // TODO: CLEAN THIS UP
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requireAuth: false },
      children: [
        {
          path: '/login',
          name: 'login',
          meta: { requireAuth: false },
          component: () => import('@/components/organisms/AppLogin.vue')
        },
        {
          path: '/register',
          name: 'register',
          meta: { requireAuth: false },
          component: () => import('@/components/organisms/AppRegister.vue')
        },
        {
          path: '/password',
          name: 'password',
          meta: { requireAuth: false },
          component: () => import('@/components/organisms/AppPassword.vue')
        }
      ]
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/GroupsView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/groups/:id(\\d+)',
      name: 'specificGroup',
      props: true,
      component: () => import('@/views/GroupDetailView.vue'),
      meta: { requireAuth: true }
    },
    // {x
    //     path: '/groups/:id(\\d+)/join',
    //     name: 'joinGroup',
    //     props: true,
    //     component: () => import('@/views/JoinGroupView.vue'),
    //     meta: {requireAuth: true},
    // },

    {
      path: '/organisations',
      name: 'organisations',
      component: () => import('@/views/OrganisationsView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/organisations/add',
      name: 'addOrganisation',
      component: () => import('@/views/GeneralAddView.vue'),
      meta: { requireAuth: true }
    },
    {
      path: '/organisations/:id(\\d+)',
      meta: { requireAuth: true, requireAdmin: true },
      // TODO: admin
      name: 'specificOrganisation',
      props: true,
      component: () => import('@/views/OrganisationDetailView.vue')
    },
    {
      path: '/organisations/:id(\\d+)/:type(\\w+)/add',
      name: 'generalAdd',
      props: true,
      component: () => import('@/views/GeneralAddView.vue'),
      meta: { requireAuth: true, requireAdmin: true, requireRouteVerify: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/WelcomeView.vue')
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: () => import('@/views/WelcomeView.vue')
    },
  ]
})
router.beforeEach(authGuard)
export default router
