/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-18 21:44:07
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-09-10 22:10:14
 * @FilePath: /pinkmoe_index/utils/http/axios/index.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
 */
import https from 'https'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { TokenPrefix, getToken } from '../../auth'
import { showMessage } from './status'
import type { IResponse } from './type'
import { BASEURL } from '/@/constant'
// 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 5000
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] =  AUTH_TOKEN
// 允许跨域
// axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
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
    if (process.client) {
      const token = getToken()
      if (token && config.headers)
        config.headers.Authorization = `${TokenPrefix}${token}`
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

const request = <T = any>(config: AxiosRequestConfig, result?: boolean): Promise<T> => {
  const conf = config
  // config.url = config.url?.replace(API_BASE_URL, API_BASE_REPLACE_URL)
  return new Promise((resolve) => {
    if (result) {
      axiosInstance.request<any, AxiosResponse>(conf).then((res: AxiosResponse) => {
        const { data: result } = res
        resolve(result as T)
      })
    }
    else {
      axiosInstance
        .request<any, AxiosResponse<IResponse>>(conf)
        .then((res: AxiosResponse<IResponse>) => {
          const {
            data: { result },
          } = res
          resolve(result as T)
        })
    }
  })
}

export function get<T = any>(config: AxiosRequestConfig, result?: boolean): Promise<T> {
  return request({ ...config, method: 'GET' }, result)
}

export function post<T = any>(config: AxiosRequestConfig, result?: boolean): Promise<T> {
  return request({ ...config, method: 'POST' }, result)
}

export default request
export type { AxiosInstance, AxiosResponse }
