<!--
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-22 11:42:51
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-27 11:24:57
 * @FilePath: /pinkmoe_index/components/Searchrecategory/index.vue
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
-->
<script lang="ts" setup name="Searchrecategory">
import SearchReCategory from '/@/components/Searchrecategory/index.vue'
defineProps({
  item: {
    type: Object,
    default: null,
  },
  currentCategory: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['emitCategoryPost'])
const show = ref(false)
const searchReCategory = ref()
const childrenCategory = ref<any>(null)
function getChildCategory(item) {
  show.value = true
  childrenCategory.value = item
  if (searchReCategory.value)
    searchReCategory.value.hide()

  emit('emitCategoryPost', item)
}

function emitCategoryPost(item) {
  emit('emitCategoryPost', item)
}

function hide() {
  show.value = false
}

defineExpose({
  hide,
})
</script>

<template>
  <div v-if="item.children">
    <div class="flex flex-row">
      <div
        :class="
          currentCategory.slug === item.slug && currentCategory.type === 'all'
            ? 'text-white bg-pink-400'
            : 'text-gray-500'
        "
        class="text-xs hover:bg-pink-400 dark:text-gray-200 hover:text-white px-2 py-1 duration-300 cursor-pointer"
        @click="
          getChildCategory({
            slug: item.slug,
            type: 'all',
          })
        "
      >
        全部
      </div>
      <div
        v-for="(item, index) in item.children"
        :key="index"
        :class="
          currentCategory.slug === item.slug && currentCategory.type !== 'all'
            ? 'text-white bg-pink-400'
            : 'text-gray-500'
        "
        class="text-xs hover:bg-pink-400 dark:text-gray-200 hover:text-white px-2 py-1 duration-300 cursor-pointer"
        @click="getChildCategory(item)"
      >
        {{ item.name }}
        <i v-if="item.children" class="inline-block i-ion:caret-down-outline" />
      </div>
    </div>
    <SearchReCategory
      v-if="show"
      ref="searchReCategory"
      :current-category="currentCategory"
      :item="childrenCategory"
      @emitCategoryPost="emitCategoryPost"
    />
  </div>
</template>
