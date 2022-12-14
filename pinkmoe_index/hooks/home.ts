/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-21 09:10:50
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-28 16:42:35
 * @FilePath: /pinkmoe_index/hooks/home.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
 */
import { getHomeList } from '/@/api/home'
import type { ResContent, ResPost } from '/@/api/home/types'

export const useHomeList = () => {
  const content = ref<Array<ResContent>>()
  const popular = ref<Array<ResPost>>()
  const recommend = ref<Array<ResPost>>()
  const contentRef = ref()
  const loading = ref(false)

  // 获取首页
  const getHome = async () => {
    loading.value = true
    const homeList = await getHomeList()
    content.value = homeList.content
    popular.value = homeList.popular
    recommend.value = homeList.recommend
    setTimeout(() => {
      loading.value = false
    }, 300)
  }

  const data = reactive<any>({
    showBar: false,
    showIndex: 0,
  })

  function jump(i: any) {
    data.showIndex = i
    if (process.client)
      document.documentElement.scrollTop = contentRef.value.children[i].offsetTop
  }

  function scrollHandler() {
    // 当前滚动高度
    if (process.client) {
      const scrollY = document.documentElement.scrollTop
      if (scrollY > 700) {
        data.showBar = true
        data.showIndex = -1
      }
      else {
        data.showBar = false
      }
      for (let i = 0; i < contentRef.value.children.length; i++) {
        if (scrollY + 50 > contentRef.value.children[i].offsetTop)
          data.showIndex = i
      }
    }
  }

  watchEffect(() => {
    nextTick(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', scrollHandler)
        window.addEventListener('scroll', scrollHandler)
      }
    })
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined')
      window.removeEventListener('scroll', scrollHandler)
  })

  onMounted(() => {
    scrollHandler()
    getHome()
  })

  return {
    content,
    popular,
    recommend,
    contentRef,
    jump,
    loading,
    data,
  }
}
