import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import './assets/main.css'
import './assets/common.css'
import './assets/layout.scss'
const app = createApp(App)
app.use(createPinia())

app.use(router).mount('#app')
