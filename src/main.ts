import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import './assets/css/icon.css'
import 'element-plus/dist/index.css';
import * as echarts from 'echarts'


// createApp(App).mount('#app')
const app = createApp(App)
// installElementPlus(app)

app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
