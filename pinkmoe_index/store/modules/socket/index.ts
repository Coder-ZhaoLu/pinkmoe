/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-29 19:46:40
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-30 10:22:14
 * @FilePath: /pinkmoe_index/store/modules/socket/index.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { useUserStore } from '../user'
import { getToken, isLogin } from '/@/utils/auth'

export interface SocketState {
  socket?: any
  lockReconnect: boolean
  tt: any
  heartCheck: any
}

export const useSocketStore = defineStore({
  id: 'socket',
  state: (): SocketState => ({
    // 连接状态
    socket: null,
    lockReconnect: false,
    tt: null,
    heartCheck: {
      timeout: 3000,
      timeoutObj: null,
      serverTimeoutObj: null,
    },
  }),
  actions: {
    start() {
      const auth = useUserStore()
      this.heartCheck.timeoutObj && clearTimeout(this.heartCheck.timeoutObj)
      this.heartCheck.serverTimeoutObj && clearTimeout(this.heartCheck.serverTimeoutObj)
      this.heartCheck.timeoutObj = setTimeout(() => {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        this.socket.send(
          JSON.stringify({
            type: 'heartbeat',
            chatMsg: {
              userId: auth.userInfo?.uuid,
            },
          }),
        )
      }, this.heartCheck.timeout)
    },
    closeSocket() {
      if (this.socket)
        this.socket.close()
    },
    reconnect() {
      if (this.lockReconnect)
        return

      this.lockReconnect = true
      // 没连接上会一直重连，设置延迟避免请求过多
      this.tt && clearTimeout(this.tt)
      this.tt = setTimeout(() => {
        this.createWebSocket()
        this.lockReconnect = false
      }, 4000)
    },
    createWebSocket() {
      if (isLogin()) {
        if (process.client) {
          try {
            this.socket = new WebSocket(`/ws?token=${getToken()}`)
            this.init()
          }
          catch (e) {
            this.reconnect()
          }
        }
      }
    },
    init() {
      this.socket.onclose = () => {
        this.reconnect()
      }
      this.socket.onerror = (e) => {
        this.reconnect()
      }
      this.socket.onopen = () => {
        // 心跳检测重置
        this.start()
        // 自定义全局监听事件
        window.dispatchEvent(
          new CustomEvent('onopenWS', {
            detail: {
              data: this.socket,
            },
          }),
        )
      }
      this.socket.onmessage = (event) => {
        this.start()
        window.dispatchEvent(
          new CustomEvent('onmessageWS', {
            detail: {
              data: JSON.parse(event.data),
            },
          }),
        )
      }
    },
  },
})
