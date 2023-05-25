import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { apiAxios } from '@/instances/apiAxios'
import router from '@/router'

interface User {
  first_name?: string
  last_name?: string
  email: string
  password?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>()
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = ref(false)

  const getUser = async () => {
    if (user.value) return user.value

    try {
      const { data: u } = await apiAxios.get('/user')
      return u
    } catch (e) {
      return null
    }
  }

  const initUser = async () => {
    user.value = await getUser()
  }

  const localLogin = async () => {
    const v = localStorage.getItem('user')
    if (!v) return false
    const v1 = await JSON.parse(v)
    if (!v1?.email) return false
    return !(await login(v1))
  }

  const login = async (payload: User) => {
    try {
      await apiAxios.post('/login', payload)
    } catch (e: any) {
      return e.response.data.message
    }
    await initUser()
  }

  const logout = async () => {
    try {
      await apiAxios.post('/logout')
    } catch (e: any) {
      return e.response.data.message
    }
    user.value = undefined
    localStorage.removeItem('user')
    await apiAxios.get(`/sanctum/csrf-cookie`, { baseURL: import.meta.env.VITE_BASE_URL })
    await router.push({ name: 'login' })
  }

  const register = async (payload: User) => {
    try {
      await apiAxios.post('/register', payload)
    } catch (e: any) {
      return e.response.data.errors
    }
    //await login({email: payload.email, password: payload.password})
    // await router.push({name: 'home'})
  }

  return {
    user,
    getUser,
    initUser,
    login,
    logout,
    register,
    isAuthenticated,
    localLogin,
    isLoading
  }
})
