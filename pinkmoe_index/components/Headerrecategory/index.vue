<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-22 10:59:57
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-28 19:55:30
 * @FilePath: /pinkmoe_index/components/Headerrecategory/index.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
-->
<script lang="ts" setup name="Headerrecategory">
import HeaderReCategory from '/@/components/Headerrecategory/index.vue'
defineProps({
  item: {
    type: Array,
    default: null,
  },
  index: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['emitCategoryPost'])
const isShow = ref(false)
const children = ref()
const childIndex = ref()
const headerReCategory = ref()
const mouseenter = (item, index) => {
  isShow.value = true
  children.value = item
  childIndex.value = index
  if (headerReCategory.value)
    headerReCategory.value.hide()

  emit('emitCategoryPost', item)
}

function hide() {
  isShow.value = false
}

defineExpose({
  hide,
})
</script>

<template>
  <ul
    v-if="item"
    :style="index === 0 ? `top: -12px` : `top: ${32 * index - 12}px`"
    class="flex-col dark:bg-gray-600 bg-opacity-90 -top-3 childrenCategory pt-3 pb-3 bg-white absolute left-32 shadow-xl animate-fadeIn30 hover:flex"
  >
    <div class="relative">
      <li
        v-for="(i, index) in item.children"
        :key="index"
        class="flex flex-row text-xs"
        @mouseenter="mouseenter(i, index)"
      >
        <NuxtLink
          :to="`/category/${i.slug}`"
          class="pl-4 py-2 w-32 hover:bg-pink-400 hover:text-white cursor-pointer duration-300"
        >
          <span class="iconify inline-block " :data-icon="`${i.icon}`" />
          <span class="ml-1 mr-4">{{ i.name }}</span>
          <i v-if="i.children" class="inline-block i-fluent:caret-right-12-filled" />
        </NuxtLink>
      </li>
      <HeaderReCategory v-if="isShow" ref="headerReCategory" :item="children" :index="childIndex" />
    </div>
  </ul>
</template>
