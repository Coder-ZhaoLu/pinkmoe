<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-21 18:50:47
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-27 11:25:05
 * @FilePath: /pinkmoe_index/components/Slidepost/index.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
-->
<script lang="ts" setup name="Slidepost">
import { useUtil } from '/@/hooks/util'

defineProps({
  posts: {
    type: Array,
    default: null,
  },
})
const { getThumbnail } = useUtil()
</script>

<template>
  <div class="flex flex-wrap animate-fadeIn30">
    <div v-for="(item, index) in posts" :key="index" class="w-1/2 px-1 my-1">
      <div
        class="border-2 border-transparent hover:border-pink-400 duration-300 hover:bg-pink-50 rounded-md overflow-hidden"
      >
        <NuxtLink :to="`/post/${item.postId}`">
          <div class="bg-white dark:bg-gray-700 rounded-md overflow-hidden">
            <img
              v-lazy="getThumbnail(item.cover)"
              class="h-28 w-full animate-lazyloaded object-cover cursor-pointer object-cover"
              alt=""
            >
            <div
              class="text-ellipsis text-xs px-2 mb-2 pt-2 line-clamp-2 h-10 cursor-pointer hover:text-pink-400 duration-300"
            >
              {{ item.title }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
