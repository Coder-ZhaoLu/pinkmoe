/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-06-22 11:13:07
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-07 08:58:28
 * @FilePath: /pinkmoe_server/logic/admin/loginLog.go
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe   (如需用于商业用途或者二开，请联系作者捐助任意金额即可)
 * QQ:2419857357;支付宝:13135986153
 * Copyright (c) 2022 by coderzhaolu, All Rights Reserved.
 */
package adminLogic

import (
	"server/dao/mysql"
	"server/model"
	"server/model/request"
)

func GetLoginLogList(p request.SearchLoginLogParams) (err error, list interface{}, total int64) {
	err, list, total = mysql.GetLoginLogList(&p)
	return
}

func CreateLoginLog(p model.XdLoginLog) (err error) {
	err = mysql.CreateLoginLog(&p)
	return
}

func UpdateLoginLog(p model.XdLoginLog) (err error) {
	err = mysql.UpdateLoginLog(&p)
	return
}

func DeleteLoginLog(p model.XdLoginLog) (err error) {
	err = mysql.DeleteLoginLog(&p)
	return
}