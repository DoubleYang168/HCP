import axios from 'axios'
import { VueAxios } from './axios'


const IS_DEV = process.env.NODE_ENV === 'development'
export const baseURL = IS_DEV ? '' : process.env.VUE_APP_BASE_API;

// 创建 axios 实例
const service = axios.create({
  baseURL: '', // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    console.log('这里放请求通用异常处理')
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  console.log('这个拦截器可以在请求后台时加入通用header')
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

const get = (url, params, config = {}) => {
  return service.get(url, { params, ...config });
};

const post = (url, params, config = {}) => {
  return service.post(url, params, config);
};

export {
  installer as VueAxios,
  service as axios,
  get, post
}
