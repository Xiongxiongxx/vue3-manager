import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import App from './App.vue'
// 引入 vue-router
import router from './router'

// 引入pinia
import store from './store'
import '@/style/index.less' // global css

const app = createApp(App).use(store)
app.use(ElementPlus)
//  统一注册el-icon图标
app.use(router).mount('#app')

