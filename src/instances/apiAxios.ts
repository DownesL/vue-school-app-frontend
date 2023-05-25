import axios from 'axios'
import router from '@/router'
import { useLoadingStore } from '@/stores/loading'

const apiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true
})

apiAxios.interceptors.request.use(
  (request: any) => {
    // useLoadingStore().$patch({ loading: true })
    return request
  },
  (error) => {
    if (useLoadingStore().loading) {
      // useLoadingStore().$patch({ loading: true })
    }
    return Promise.reject(error)
  }
)

// add interceptors (optional)
apiAxios.interceptors.response.use(
  (response: any) => {
    // useLoadingStore().$patch({ loading: false })
    return response
  },
  (error: any) => {
    // useLoadingStore().$patch({ loading: false })
    if (error.response?.status === 404) {
      router.push({ name: 'Notfound' })
    } else if (error.response?.status === 403) {
      console.log(error)
      router.push({ name: 'Unauthorized' })
    }
    return Promise.reject(error)
  }
)

// export and use in your code
export { apiAxios }
