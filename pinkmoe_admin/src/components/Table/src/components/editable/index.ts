/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-04-21 22:34:07
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-07 09:17:07
 * @FilePath: /pinkmoe_admin/src/components/Table/src/components/editable/index.ts
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved. 
 */
import type { BasicColumn } from '@/components/Table/src/types/table';
import { h, Ref } from 'vue';

import EditableCell from './EditableCell.vue';

export function renderEditCell(column: BasicColumn) {
  return (record, index) => {
    const _key = column.key;
    const value = record[_key];
    record.onEdit = async (edit: boolean, submit = false) => {
      if (!submit) {
        record.editable = edit;
      }

      if (!edit && submit) {
        const res = await record.onSubmitEdit?.();
        if (res) {
          record.editable = false;
          return true;
        }
        return false;
      }
      // cancel
      if (!edit && !submit) {
        record.onCancelEdit?.();
      }
      return true;
    };
    return h(EditableCell, {
      value,
      record,
      column,
      index,
    });
  };
}

export type EditRecordRow<T = Recordable> = Partial<
  {
    onEdit: (editable: boolean, submit?: boolean) => Promise<boolean>;
    editable: boolean;
    onCancel: Fn;
    onSubmit: Fn;
    submitCbs: Fn[];
    cancelCbs: Fn[];
    validCbs: Fn[];
    editValueRefs: Recordable<Ref>;
  } & T
>;