import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/composables/authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
      meta: { title: 'welcome | UpToDate' }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requireAuth: true, title: 'home | UpToDate' }
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/views/MessagesView.vue'),
      meta: { requireAuth: true, title: 'messages | UpToDate' }
    },
    {
      path: '/messages/:id(\\d+)',
      name: 'messageDetail',
      props: true,
      component: () => import('@/views/MessageDetailView.vue'),
      meta: { requireAuth: true, title: 'x | UpToDate' }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountsView.vue'),
      meta: { requireAuth: true, title: 'account | UpToDate' }
    },
    {
      // TODO: CLEAN THIS UP
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requireAuth: false, title: 'login | UpToDate' },
      children: [
        {
          path: '/login',
          name: 'login',
          meta: { requireAuth: false, title: 'login | UpToDate' },
          component: () => import('@/components/organisms/AppLogin.vue')
        },
        {
          path: '/register',
          name: 'register',
          meta: { requireAuth: false, title: 'register | UpToDate' },
          component: () => import('@/components/organisms/AppRegister.vue')
        },
        {
          path: '/password',
          name: 'password',
          meta: { requireAuth: false, title: 'set passwords | UpToDate' },
          component: () => import('@/components/organisms/AppPassword.vue')
        }
      ]
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/GroupsView.vue'),
      meta: { requireAuth: true, title: 'groups | UpToDate' }
    },
    {
      path: '/groups/:id(\\d+)',
      name: 'specificGroup',
      props: true,
      component: () => import('@/views/GroupDetailView.vue'),
      meta: { requireAuth: true, title: 'x | UpToDate' }
    },

    {
      path: '/organisations',
      name: 'organisations',
      component: () => import('@/views/OrganisationsView.vue'),
      meta: { requireAuth: true, title: 'organisations | UpToDate' }
    },
    {
      path: '/organisations/add',
      name: 'addOrganisation',
      component: () => import('@/views/GeneralAddView.vue'),
      meta: { requireAuth: true, title: 'add organisation | UpToDate' }
    },
    {
      path: '/organisations/:id(\\d+)',
      meta: { requireAuth: true, requireAdmin: true, title: 'x  | UpToDate' },
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
        title: 'add x | UpToDate'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/WelcomeView.vue'),
      meta: { title: 'Page Not Found | UpToDate' }
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: () => import('@/views/WelcomeView.vue'),
      meta: { title: 'Unauthorized | UpToDate' }
    }
  ]
})
router.beforeEach(authGuard)
export default router
