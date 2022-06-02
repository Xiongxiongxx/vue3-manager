import { createPinia } from 'pinia'
// 引入持久化插件
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)
// 引入store模块
import { userStore } from './modules/user'

export default store
export { userStore }
