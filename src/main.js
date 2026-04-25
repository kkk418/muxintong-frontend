import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import './assets/styles/theme.css'
import './assets/styles/responsive.css'
import './assets/styles/presentation.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
