import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueEasyLightbox from 'vue-easy-lightbox'
import App from './App.vue'
import router from './router'
import "@milkdown/theme-nord/style.css"
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueEasyLightbox)
app.mount('#app')
