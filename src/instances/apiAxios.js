import axios from "axios";

const apiAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL ?? 'http://localhost:8080'}/api`,
    withCredentials: true
})

// add interceptors (optional)
apiAxios.interceptors.response.use( /* interceptors */ );

// export and use in your code
export { apiAxios }
