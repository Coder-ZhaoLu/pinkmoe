<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-08-04 07:40:06
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-21 16:05:06
 * @FilePath: /pinkmoe_index/src/components/Shopconfirm/index.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
-->
<script lang="ts" setup name="Publishcomment">
import Dialog from '/@/components/Dialog/index.vue'
import GreenBtn from '/@/components/Greenbtn/index.vue'
import BasicInput from '/@/components/Basicinput/index.vue'
import WhiteBtn from '/@/components/Whitebtn/index.vue'
import { useShopConfirm } from '/@/hooks/shopConfirm'

const props = defineProps({
  authorShop: {
    type: Object,
    default: null,
  },
})

const { showAnimate, dialog, num, submitShop, key, currentVip } = useShopConfirm(props)
</script>

<template>
  <Dialog
    ref="dialog"
    :hide-fun="
      () => {
        showAnimate = false;
      }
    "
    :show-fun="
      () => {
        showAnimate = true;
      }
    "
  >
    <div
      :class="showAnimate ? 'animate-pinkZoomInUp30' : 'animate-pinkZoomOutDown30'"
      class="fixed top-0 bottom-0 left-0 ring-0 flex justify-center items-center h-full w-full pointer-events-none"
    >
      <form
        onsubmit="return false"
        class="lg:w-1/6 xl:w-2/12 bg-gray-50 dark:bg-gray-700 pointer-events-auto flex flex-col rounded-md overflow-hidden"
      >
        <div class="flex flex-row justify-between items-center">
          <div
            class="flex flex-row justify-center items-center text-gray-500 dark:text-gray-200 text-xs ml-4 p-0 rounded-bl-md rounded-br-md overflow-hidden"
          >
            <i class="inline-block i-material-symbols:check-circle" />
            <span class="ml-1">确定{{ authorShop.shopName }}规格</span>
          </div>
          <div
            class="text-sm px-4 py-2 flex justify-center items-center bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer hover:text-white hover:bg-pink-400 duration-300 rounded-bl-md"
            @click="dialog.hide()"
          >
            <i class="inline-block i-clarity:times-circle-solid" />
          </div>
        </div>
        <div class="pb-4 pt-2 px-4 text-xs">
          <div v-if="authorShop.priceType === 'credit' || authorShop.priceType === 'cash'">
            <BasicInput
              v-model:value="num"
              class="w-full text-xs"
              icon="i-material-symbols:calendar-month"
              :max="100"
              type="number"
              placeholder="输入开通数量"
            />
            <div class="flex flex-row justify-between items-center">
              <div>
                价格：<span class="text-red-500 text-xl">{{ num * currentVip?.shopCredit }}¥</span>
              </div>
            </div>
          </div>
          <div v-else-if="authorShop.priceType === 'key'">
            <BasicInput
              v-model:value="key"
              class="w-full text-xs"
              icon="i-material-symbols:key"
              :max="100"
              type="text"
              placeholder="输入充值卡密"
            />
          </div>
        </div>
        <div class="flex flex-row">
          <WhiteBtn
            classes="w-6/12"
            icon="fa6-solid:circle-xmark"
            value="关闭"
            @click="
              () => {
                dialog.hide();
              }
            "
          />
          <GreenBtn classes="w-6/12" icon="i-material-symbols:check-circle" value="开通" @click="submitShop" />
        </div>
      </form>
    </div>
  </Dialog>
</template>
