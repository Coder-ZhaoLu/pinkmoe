/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-05-06 14:55:21
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-07 09:14:20
 * @FilePath: /pinkmoe_admin/src/api/monitor/userOnline.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved. 
 */
import { http } from '@/utils/http/axios';
import { BasicResponseModel } from '@/api/common';

/**
 * @description: 获取用户在线日志列表
 * @param params
 */
export function getUserOnlineList(params?) {
  return http.request<BasicResponseModel>(
    {
      url: '/Admin/UserOnline/UserOnlineList',
      method: 'GET',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 更新用户在线日志
 * @param params
 */
export function updateUserOnline(params) {
  return http.request(
    {
      url: `/Admin/UserOnline/UserOnlineUpdate`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 创建用户在线日志
 * @param params
 */
export function createUserOnline(params) {
  return http.request(
    {
      url: `/Admin/UserOnline/UserOnlineCreate`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 删除用户在线日志
 * @param params
 */
export function deleteUserOnline(params) {
  return http.request(
    {
      url: `/Admin/UserOnline/UserOnlineDelete`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}