import { createRouter, createWebHistory } from 'vue-router'
import { useAuthGuard } from '@/composables/useAuthGuard'
import { useSetTitle } from '@/composables/setTitle'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
      meta: { title: 'Welcome | UpToDate' }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requireAuth: true, title: 'Home | UpToDate' }
    },
    {
      path: '/messages',
      name: 'messages',
      props: (route) => ({ search: route.query.q }),
      component: () => import('@/views/MessagesView.vue'),
      meta: { requireAuth: true, title: 'Messages | UpToDate' }
    },
    {
      path: '/messages/:id(\\d+)',
      name: 'messageDetail',
      props: true,
      component: () => import('@/views/MessageDetailView.vue'),
      meta: { requireAuth: true, title: 'Message | UpToDate' }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountsView.vue'),
      meta: { requireAuth: true, title: 'Account | UpToDate' }
    },
    {
      // TODO: CLEAN THIS UP
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requireAuth: false, title: 'Login | UpToDate' },
      children: [
        {
          path: '/login',
          name: 'login',
          meta: { requireAuth: false, title: 'Login | UpToDate' },
          component: () => import('@/components/organisms/AppLogin.vue')
        },
        {
          path: '/register',
          name: 'register',
          meta: { requireAuth: false, title: 'Register | UpToDate' },
          component: () => import('@/components/organisms/AppRegister.vue')
        },
        {
          path: '/password',
          name: 'password',
          meta: { requireAuth: false, title: 'Set Password | UpToDate' },
          component: () => import('@/components/organisms/AppPassword.vue')
        }
      ]
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/GroupsView.vue'),
      meta: { requireAuth: true, title: 'Groups | UpToDate' }
    },
    {
      path: '/groups/:id(\\d+)',
      name: 'specificGroup',
      props: true,
      component: () => import('@/views/GroupDetailView.vue'),
      meta: { requireAuth: true, title: 'Group | UpToDate' }
    },

    {
      path: '/organisations',
      name: 'organisations',
      component: () => import('@/views/OrganisationsView.vue'),
      meta: { requireAuth: true, title: 'Organisations | UpToDate' }
    },
    {
      path: '/organisations/add',
      name: 'addOrganisation',
      component: () => import('@/views/GeneralAddView.vue'),
      meta: { requireAuth: true, title: 'Add Organisation | UpToDate' }
    },
    {
      path: '/organisations/:id(\\d+)',
      meta: { requireAuth: true, requireAdmin: true, title: 'Organisation  | UpToDate' },
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
      meta: {
        requireAuth: true,
        requireAdmin: true,
        requireRouteVerify: true,
        title: `Add ... | UpToDate`
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/errors/404View.vue'),
      meta: { title: 'Page Not Found | UpToDate' }
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: () => import('@/views/errors/403View.vue'),
      meta: { title: 'Unauthorized | UpToDate' }
    }
  ]
})
router.beforeEach(useAuthGuard)
router.beforeEach(useSetTitle)
export default router
