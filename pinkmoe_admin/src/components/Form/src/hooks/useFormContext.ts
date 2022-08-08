/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-04-21 22:34:07
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-07 09:15:32
 * @FilePath: /pinkmoe_admin/src/components/Form/src/hooks/useFormContext.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved. 
 */
import { provide, inject } from 'vue';

const key = Symbol('formElRef');

export function createFormContext(instance) {
  provide(key, instance);
}

export function useFormContext() {
  return inject(key);
}