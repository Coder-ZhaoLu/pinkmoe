/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-24 08:40:11
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-28 16:31:36
 * @FilePath: /pinkmoe_index/hooks/bbs/bbs.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * PinkMoe主题上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
 */
import { useI18n } from 'vue-i18n'
import { useUtil } from '../util'
import type { ResPage } from '/@/api/common/types'
import type { ResPost } from '/@/api/home/types'
import { createPost, getBbsSilder, getPostList } from '/@/api/post'
import type { ReqBbsActive, ReqBbsPost, ResBbsSilder } from '/@/api/post/types'
import { useUserStore } from '/@/store/modules/user'

export const useBbs = () => {
  const postList = ref<ResPage<Array<ResPost>>>()
  const bbsSilder = ref<ResBbsSilder>()
  const { proxy } = getCurrentInstance()
  const { t } = useI18n()
  const sort = ref<any>([
    {
      title: 'accordingToLatest',
      type: 'updated_at',
    },
    {
      title: 'accordingToTitle',
      type: 'title',
    },
    {
      title: 'accordingToAuthor',
      type: 'author',
    },
    {
      title: 'accordingToView',
      type: 'view',
    },
  ])
  const leftBar = ref([
    {
      name: 'bbs.focus',
      slug: 'focus',
    },
    {
      name: 'bbs.all',
      slug: 'all',
    },
    {
      name: 'bbs.hot',
      slug: 'hot',
    },
    {
      name: 'bbs.active',
      slug: 'active',
    },
    {
      name: 'bbs.post',
      slug: 'post',
    },
    {
      name: 'bbs.video',
      slug: 'video',
    },
    {
      name: 'bbs.music',
      slug: 'music',
    },
    {
      name: 'bbs.download',
      slug: 'download',
    },
  ])
  const auth = useUserStore()
  const route = useRoute()
  const router = useRouter()
  const formParams: ReqBbsPost = reactive({
    userId: auth?.userInfo?.uuid,
    category: '',
    type: '',
    page: 1,
    pageSize: 12,
    orderKey: 'updated_at',
    desc: true,
  })

  const postFormParams: ReqBbsActive = reactive({
    title: '',
    content: '',
    author: auth.userInfo?.uuid,
    type: 'active',
  })
  const loading = ref<boolean>(false)
  const isTitle = ref<boolean>(false)
  const formPublishRef = ref()
  const currentSlug = ref('all')
  const { checkForm } = useUtil()
  const currentSort = ref('updated_at')
  const hasMore = ref<boolean>(true)

  // 获取分类文章列表
  const getPost = async () => {
    loading.value = true
    postList.value = await getPostList(formParams)
    setTimeout(() => {
      loading.value = false
    }, 300)
  }

  // 获取分类文章列表
  const getSilder = async () => {
    bbsSilder.value = await getBbsSilder()
  }

  const sortPost = (type) => {
    formParams.page = 1
    hasMore.value = true
    if (type === 'video' || type === 'post' || type === 'music' || type === 'active') {
      formParams.author = ''
      currentSlug.value = type
      currentSort.value = 'updated_at'
      formParams.orderKey = 'updated_at'
      formParams.type = type
    }
    else if (type === 'focus') {
      formParams.author = auth?.userInfo?.uuid
      currentSlug.value = type
      currentSort.value = 'updated_at'
      formParams.orderKey = 'updated_at'
      formParams.type = type
      formParams.orderKey = 'view'
    }
    else if (type === 'hot') {
      formParams.author = ''
      currentSort.value = 'updated_at'
      currentSlug.value = type
      formParams.type = ''
      formParams.orderKey = 'view'
    }
    else if (type === 'view' || type === 'author' || type === 'title' || type === 'updated_at') {
      formParams.author = ''
      currentSort.value = type
      formParams.orderKey = type
    }
    else if (type === 'desc') {
      formParams.author = ''
      formParams.desc = !formParams.desc
    }
    else if (type === 'all') {
      formParams.author = ''
      currentSort.value = 'updated_at'
      currentSlug.value = type
      formParams.type = ''
      formParams.orderKey = 'updated_at'
    }
    getPost()
  }

  const nextPage = async () => {
    loading.value = true;
    (formParams.page as number)++
    formParams.author = auth?.userInfo?.uuid
    const res = await getPostList(formParams)
    if (!res.list || res.list?.length <= 0)
      hasMore.value = false

    else
      postList.value?.list?.push(...(res?.list as Array<ResPost>))

    setTimeout(() => {
      loading.value = false
    }, 300)
  }

  function showLogin() {
    proxy.$login({
      type: 'login',
      router,
      route,
    })
  }

  async function publishPost() {
    if (!auth.isLogin) {
      proxy.$login({
        type: 'login',
        router,
        route,
      })
      return
    }
    if (checkForm(postFormParams.content, '[\\s\\S]{1,50}$', '请输入正确的内容格式')) {
      proxy.$message({
        successMsg: '发布成功',
        failedMsg: '发布失败',
        loadFun: async () => {
          const { code, message } = await createPost(postFormParams)
          return { code, message }
        },
      }).then((res) => {
        if (res.code === 200)
          getPost()
      })
    }
  }

  onMounted(() => {
    getPost()
    getSilder()
  })

  return {
    postList,
    sort,
    formParams,
    currentSlug,
    currentSort,
    leftBar,
    hasMore,
    loading,
    isTitle,
    postFormParams,
    publishPost,
    sortPost,
    formPublishRef,
    nextPage,
    auth,
    bbsSilder,
    showLogin,
    t,
  }
}
