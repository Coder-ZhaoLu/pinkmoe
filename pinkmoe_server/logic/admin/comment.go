/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-06-22 11:13:07
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-07 08:58:12
 * @FilePath: /pinkmoe_server/logic/admin/comment.go
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe 
 * 问题反馈qq群:749150798
 * xanaduCms程序上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
 */
package adminLogic

import (
	"encoding/json"
	"server/dao/mysql"
	"server/model"
	"server/model/request"
	"server/model/response"
)

func GetCommentList(p request.SearchCommentParams) (err error, list interface{}, total int64) {
	err, list, total = mysql.GetCommentList(p)
	return
}

func GetCommentTreeList(p request.SearchCommentParams) (err error, list interface{}, total int64) {
	err, list, total = mysql.GetCommentTreeList(p)
	return
}

func CreateComment(p model.XdComment) (err error) {
	if err = mysql.CreateComment(p); err != nil {
		return err
	}
	if err == nil {
		// 初始化积分通知
		err, userReward := mysql.GetSettingItem(model.XdSetting{
			Slug: "user_reward",
		})
		var reward response.ResUserReward
		if err = json.Unmarshal([]byte(userReward.Value), &reward); err != nil {
			return response.ErrorCommentUpdate
		}
		if reward.UpdatePwdType == "cash" {
			err = mysql.UpdateUserCash(reward.CommentCredit, p.FormUid)
			if err == nil {
				if p.Type == "post" {
					CreateNotification(p.FormUid, "", p.PostId, 0, reward.CommentCredit, 0, "commentPost", "")
				} else {
					CreateNotification(p.FormUid, p.ToUid.String(), p.PostId, 0, reward.CommentCredit, p.ParentId, "comment", "")
				}
			}
		} else {
			err = mysql.UpdateUserCredit(reward.CommentCredit, p.FormUid)
			if err == nil {
				if p.Type == "post" {
					CreateNotification(p.FormUid, "", p.PostId, reward.CommentCredit, 0, 0, "commentPost", "")
				} else {
					CreateNotification(p.FormUid, p.ToUid.String(), p.PostId, reward.CommentCredit, 0, p.ParentId, "comment", "")
				}
			}
		}
	}
	return
}

func UpdateComment(p model.XdComment) (err error) {
	err = mysql.UpdateComment(p)
	return
}

func DeleteComment(p model.XdComment) (err error) {
	err = mysql.DeleteComment(p)
	return
}
