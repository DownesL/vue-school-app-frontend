import { useAuthStore } from '@/stores/auth'
import type { RouteLocation } from 'vue-router'

export async function useAuthGuard(to: RouteLocation) {
  const authStore = useAuthStore()
  if (to.meta.requireAuth && !authStore.isAuthenticated) {
    const localLogin = await authStore.localLogin()
    if (!localLogin) {
      return { name: 'login' }
    }
  }
}