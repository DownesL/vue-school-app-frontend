import { createApp } from 'vue'
import { createPinia } from 'pinia'
import CKEditor from '@ckeditor/ckeditor5-vue'
import router from './router'
import App from './App.vue'
import './assets/main.scss'

const app = createApp(App)

// await apiAxios.get('/sanctum/csrf-cookie', { baseURL: import.meta.env.VITE_BASE_URL })
await fetch(`${import.meta.env.VITE_BASE_URL}/sanctum/csrf-cookie`, {
  credentials: 'include'
})

app.use(createPinia())
app.use(router)
app.use(CKEditor)

app.mount('#app')
