/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-07-21 13:22:29
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-07 09:08:18
 * @FilePath: /pinkmoe_index/src/api/author/index.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved. 
 */
// 权限问题后期增加
import { get } from '/@/utils/http/axios';
import { ResPage } from '/@/api/common/types';
import { ResPost } from '/@/api/home/types';
import { ReqAuthorFans, ReqAuthorFollow, ReqAuthorPost, ResFollow } from '/@/api/author/types';
import { ResComment } from '/@/api/post/types';
// import axios from 'axios';
enum URL {
  post = '/api/Post/PostList',
  follow = '/api/Follow/FollowList',
  comment = '/api/Comment/CommentList',
}

const getAuthorPostList = async (params: ReqAuthorPost) =>
  get<ResPage<Array<ResPost>>>({
    url: URL.post,
    params,
  });

const getAuthorFansList = async (params: ReqAuthorFans) =>
  get<ResPage<Array<ResFollow>>>({
    url: URL.follow,
    params,
  });

const getAuthorFollowList = async (params: ReqAuthorFollow) =>
  get<ResPage<Array<ResFollow>>>({
    url: URL.follow,
    params,
  });

const getAuthorCommentList = async (params: ReqAuthorPost) =>
  get<ResPage<Array<ResComment>>>({
    url: URL.comment,
    params,
  });

export { getAuthorPostList, getAuthorFansList, getAuthorFollowList, getAuthorCommentList };