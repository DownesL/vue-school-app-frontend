import { useAuthStore } from '@/stores/auth'
import type {RouteLocation} from "vue-router";

export async function authGuard(to: RouteLocation, from: RouteLocation) {
  // do some user authorization check
  // and avoid infinite redirecto to login!
  const authStore = useAuthStore()
  if (to.meta.requireAuth && !authStore.isAuthenticated) {
    const localLogin = await authStore.localLogin()
    if (!localLogin) {
      return { name: 'login' }
    }
  }
  if (to.meta.requireRouteVerify && !['groups','messages'].includes(<string>to.params?.type)) {
    return false //TODO: UNAUTHORISED
  }
}
