import axios from 'axios'
import router from '@/router'
import { useLoading } from '@/composables/loading'

const apiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true
})

const { get, update } = useLoading()

apiAxios.interceptors.request.use(
  (request: any) => {
    if (!get()) {
      update(true)
    }
    return request
  },
  (error) => {
    update(false)
    return Promise.reject(error)
  }
)

// add interceptors (optional)
apiAxios.interceptors.response.use(
  (response: any) => {
    if (get()) {
      update(false)
    }
    return response
  },
  (error: any) => {
    update(false)
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
