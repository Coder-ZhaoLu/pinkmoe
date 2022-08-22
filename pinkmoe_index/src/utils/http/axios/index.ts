/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-18 21:44:07
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-22 22:25:17
 * @FilePath: /pinkmoe_index/src/utils/http/axios/index.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
 */
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { TokenPrefix, getToken } from '../../auth'
import { showMessage } from './status'
import type { IResponse } from './type'

// 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 5000
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] =  AUTH_TOKEN
// 允许跨域
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.BASE_URL}`,
  // transformRequest: [
  //   function (data) {
  //     //由于使用的 form-data传数据所以要格式化
  //     delete data.Authorization
  //     data = qs.stringify(data)
  //     return data
  //   },
  // ],
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.headers.authorization) {
    //   localStorage.setItem('app_token', response.headers.authorization)
    // } else if (response.data && response.data.token) {
    //   localStorage.setItem('app_token', response.data.token)
    // }

    if (response.status === 200)
      return response

    showMessage(response.status)
    return response
  },
  // 请求失败
  (error: any) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status)
      return Promise.reject(response.data)
    }
    showMessage('网络连接异常,请稍后再试!')
  },
)

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken()
    if (token && config.headers)
      config.headers.Authorization = `${TokenPrefix}${token}`

    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

const request = <T = any>(config: AxiosRequestConfig, result?: boolean): Promise<T> => {
  const conf = config
  return new Promise((resolve) => {
    if (result) {
      axiosInstance.request<any, AxiosResponse>(conf).then((res: AxiosResponse) => {
        // resolve(res as unknown as Promise<T>);
        const { data: result } = res
        resolve(result as T)
      })
    }
    else {
      axiosInstance
        .request<any, AxiosResponse<IResponse>>(conf)
        .then((res: AxiosResponse<IResponse>) => {
          // resolve(res as unknown as Promise<T>);
          const {
            data: { result },
          } = res
          resolve(result as T)
        })
    }
  })
}

// const request = <T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
//   if (typeof config === 'string') {
//     if (!options) {
//       return axiosInstance.request<T, T>({
//         url: config,
//       });
//       // throw new Error('请配置正确的请求参数');
//     } else {
//       return axiosInstance.request<T, T>({
//         url: config,
//         ...options,
//       });
//     }
//   } else {
//     return axiosInstance.request<T, T>(config);
//   }
// };

export function get<T = any>(config: AxiosRequestConfig, result?: boolean): Promise<T> {
  return request({ ...config, method: 'GET' }, result)
}

export function post<T = any>(config: AxiosRequestConfig, result?: boolean): Promise<T> {
  return request({ ...config, method: 'POST' }, result)
}

export default request
export type { AxiosInstance, AxiosResponse }
/**
 * @description: 用户登录案例
 * @params {ILogin} params
 * @return {Promise}
 */
// export const login = (params: ILogin): Promise<IResponse> => {
//     return axiosInstance.post('user/login', params).then(res => res.data);
// };
