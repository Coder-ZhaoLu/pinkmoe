<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-23 09:12:12
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-11-13 22:37:32
 * @FilePath: /pinkmoe_index/pages/user-center/shop/index.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
-->
<script lang="ts" setup name="UserCenterShopIndex">
import UserCenterLayout from '/@/components/Usercenterlayout/index.vue'
import GreenBtn from '/@/components/Greenbtn/index.vue'
import { useAppStore } from '/@/store/modules/app'
import { useHead } from '@vueuse/head'
import { useUserCenterShop } from '/@/hooks/user-center/shop'

definePageMeta({
  middleware: ['user-auth'],
  layout: 'user-center',
})

const { siteBasic } = useAppStore()
const { auth, currentIndex, userShop, loading, buyShop } = useUserCenterShop()
useHead({
  title: '商城 - 用户中心',
  link: [
    { rel: 'icon', type: 'image/x-icon', href: `${siteBasic?.icon}` },
  ],
  meta: [
    { name: 'og:type', content: 'shop' },
    {
      name: 'og:title',
      content: '商城 - 用户中心',
    },
    { name: 'og:url', content: siteBasic?.url },
  ],
})
</script>

<template>
  <div class="ml-6">
    <div
      class="w-full mt-3 mb-2 inline-block bg-white dark:bg-gray-700 rounded-md shadow-sm relative"
    >
      <div class="absolute flex justify-center items-center -top-3 text-xs bg-sky-600 px-1.5 py-1 text-white ml-4 cursor-pointer">
        <i class="inline-block i-material-symbols:shopping-bag" />
        <span class="ml-1 select-none">商城</span>
      </div>
      <div class="p-4">
        <div
          class="px-4 py-3 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 mt-2 text-xs text-gray-500"
        >
          <p>这里会展示我的商城！</p>
        </div>
      </div>
      <div class="flex flex-col items-center px-4 pb-4">
        <div
          class="px-4 py-3 w-full bg-gray-100 dark:bg-gray-800 dark:text-gray-200 mt-2 text-xs text-gray-500"
        >
          <p class="text-xs py-1 flex justify-start items-center">
            <span class="text-xs">我的积分</span><span class="ml-4 bg-green-400 rounded-xl text-white px-1 py-0.5 flex justify-center items-center">
              <i class="inline-block mr-1 i-lucide:gem" /> 积分{{ auth.userInfo?.credit }}</span>
          </p>
          <p class="text-xs py-1 flex justify-start items-center">
            <span class="text-xs">我的现金</span><span class="ml-4 bg-red-400 rounded-xl text-white px-1 py-0.5 flex justify-center items-center">
              <i class="inline-block mr-1 i-lucide:gem" /> 现金{{ auth.userInfo?.cash }}</span>
          </p>
          <p class="text-xs py-1 flex justify-start items-center">
            <span class="text-xs">我的角色</span>
            <span class="ml-4 bg-pink-400 rounded-xl text-white px-1 py-0.5 flex justify-center items-center">
              <i class="inline-block mr-1 i-lucide:gem" />
              {{ auth.userInfo?.authority?.authorityName }}</span>
          </p>
        </div>
        <Spin :show="loading" class="flex flex-wrap">
          <div class="w-full py-4 flex flex-wrap">
            <div v-for="(shop, v) in userShop" :key="v" class="w-1/2 p-1">
              <div
                :class="
                  currentIndex === v
                    ? 'dark:bg-gray-900 bg-gray-100 border-pink-400 hover:bg-gray-200 dark:hover:bg-gray-900'
                    : ' dark:bg-gray-800 bg-gray-50 border-gray-200 dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900'
                "
                class="flex flex-row items-center border-2 px-4 cursor-pointer duration-300 rounded-md"
                @click="currentIndex = v"
              >
                <i class="text-4xl inline-block p-5 i-ri:gift-2-fill" />
                <div class="p-2">
                  <div class="text-base pb-1">
                    {{ shop.shopName }}
                  </div>
                  <div class="text-xs">
                    {{ shop.shopDesc }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spin>
        <GreenBtn
          classes="w-full mt-2"
          value="立即购买"
          icon="i-bi:cart-plus-fill"
          @click="buyShop"
        />
      </div>
    </div>
  </div>
</template>
