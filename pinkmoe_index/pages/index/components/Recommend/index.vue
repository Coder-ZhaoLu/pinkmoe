<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-08-25 13:54:33
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-25 16:04:22
 * @FilePath: /pinkmoe_index/pages/index/components/Recommend/index.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
-->
<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-21 09:47:23
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-21 10:34:03
 * @FilePath: /pinkmoe_vitesse/src/pages/index/components/Recommend/index.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
-->
<script lang="ts" setup>
import NotFound from '/@/components/NotFound/index.vue'
import Article from '/@/components/Article/index.vue'
import { useI18n } from 'vue-i18n'

defineProps({
  recommend: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const { t } = useI18n()
</script>

<template>
  <div class="lg:w-2/3 xl:w-5/12 mt-4 justify-center items-center animate-fadeIn30">
    <div class="flex flex-row justify-center mb-2">
      <div class="w-7 h-7 bg-sky-400 rounded-full flex justify-center items-center text-white mr-1">
        <i class="inline-block i-material-symbols:recommend" />
      </div>
      <div class="text-lg">
        {{ t('home.recommendedBar') }}
      </div>
    </div>
    <Spin :show="loading" class="flex flex-wrap justify-center">
      <div class="flex justify-center flex-wrap w-full">
        <div v-if="recommend" class="w-full flex justify-center flex-wrap mt-4 animate-fadeIn30">
          <div v-for="(post, v) in recommend" :key="v" class="w-1/6 h-80 p-1.5 overflow-hidden">
            <Article :post="post" img-height="h-60" />
          </div>
        </div>
        <NotFound v-else />
      </div>
    </Spin>
  </div>
</template>
