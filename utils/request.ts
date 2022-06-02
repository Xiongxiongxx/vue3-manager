import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus';
import { indexOf } from 'lodash';
import { notTokenApi } from './globa';
import { storeToRefs } from "pinia"
import { userStore } from "@/store";
import router from '@/router/index'
const store = userStore();
let { token } = storeToRefs(store);
import * as axios from 'axios'
declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
// process.env.
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // withCredentials: true,
  timeout: 50000
})
service.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    if(notTokenApi.indexOf(request.url) === -1){
      request.headers['Authorization'] = token.value || '' // 'application/x-www-form-urlencoded'
    }
    return request
  },
  (error: AxiosError) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // Error
    if (res.success == 'false' || res.success == false) {
      console.log(res.message || 'Error')
      ElMessage.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  (error: AxiosError) => {
    if (error && error.request && error.request.status === 200) {
      ElMessage.error('数据请求异常，请稍后再试！')
    }else if(error && error.request && error.request.status === 401){
      ElMessage.error(router)
      router.push({ path: '/login' });
    } else {
      ElMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
