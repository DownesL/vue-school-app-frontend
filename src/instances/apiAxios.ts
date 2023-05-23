import axios from 'axios'
import router from "@/router";

const apiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true
})

// add interceptors (optional)
apiAxios.interceptors.response.use(
  function (response: any) {
    return response
  },
  function (error: any) {
      if (error.response?.status === 404) {
          router.push({name: 'Notfound'})
      } else if (error.response?.status === 401 || error.response?.status === 403) {
          //router.push({name: 'Unauthorized'})
      }
    return Promise.reject(error)
  }
)

// export and use in your code
export { apiAxios }
