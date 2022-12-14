/*
 * @Author: coderzhaolu && izhaicy@163.com
 * @Date: 2022-06-22 11:13:07
 * @LastEditors: coderzhaolu && izhaicy@163.com
 * @LastEditTime: 2022-08-07 09:02:44
 * @FilePath: /pinkmoe_server/config/config.go
 * @Description: https://github.com/Coder-ZhaoLu/pinkmoe
 * 问题反馈qq群:749150798
 * xanaduCms程序上所有内容(包括但不限于 文字，图片，代码等)均为指针科技原创所有，采用请注意许可
 * 请遵循 “非商业用途” 协议。商业网站或未授权媒体不得复制内容，如需用于商业用途或者二开，请联系作者捐助任意金额即可，我们将保存所有权利。
 * Copyright (c) 2022 by 指针科技, All Rights Reserved.
 */
package config

// AppConfig 全局配置
type AppConfig struct {
	*BasicConfig `mapstructure:"basicConfig" json:"basicConfig"`
	*MySqlConfig `mapstructure:"mySqlConfig" json:"mySqlConfig"`
	*RedisConfig `mapstructure:"redisConfig" json:"redisConfig"`
}

// BasicConfig 上传配置
type BasicConfig struct {
	Name          string `mapstructure:"name" json:"name"`
	Mode          string `mapstructure:"mode" json:"mode"`
	Host          string `mapstructure:"host" json:"host"`
	AdminHost     string `mapstructure:"adminHost" json:"adminHost"`
	Version       string `mapstructure:"version" json:"version"`
	VideoSize     int64  `mapstructure:"videoSize" json:"videoSize"`
	PicSize       int64  `mapstructure:"picSize" json:"picSize"`
	StartTime     string `mapstructure:"startTime" json:"startTime"`
	MachineId     int64  `mapstructure:"machineId" json:"machineId"`
	RateLimitTime int64  `mapstructure:"rateLimitTime" json:"rateLimitTime"`
	RateLimitNum  int64  `mapstructure:"rateLimitNum" json:"rateLimitNum"`
	Port          int    `mapstructure:"port" json:"port"`
	UploadPath    string `mapstructure:"uploadPath" json:"uploadPath"`
	*Casbin       `mapstructure:"casbin" json:"casbin"`
	*Captcha      `mapstructure:"captcha" json:"captcha"`
	*AuthConfig   `mapstructure:"authConfig" json:"authConfig"`
	*LogConfig    `mapstructure:"logConfig" json:"logConfig"`
}

// Casbin jwt配置
type Casbin struct {
	ModelPath string `mapstructure:"modelPath" json:"modelPath"`
}

// Captcha jwt配置
type Captcha struct {
	ImgHeight int `mapstructure:"imgHeight" json:"imgHeight"`
	ImgWidth  int `mapstructure:"imgWidth" json:"imgWidth"`
	KeyLong   int `mapstructure:"keyLong" json:"keyLong"`
}

// AuthConfig jwt配置
type AuthConfig struct {
	JwtExpire  int    `mapstructure:"jwtExpire" json:"jwtExpire"`
	AuthSecret string `mapstructure:"authSecret" json:"authSecret"`
	Issuer     string `mapstructure:"issuer" json:"issuer"`
}

// LogConfig 日志配置
type LogConfig struct {
	Level      string `mapstructure:"level" json:"level"`
	Filename   string `mapstructure:"filename" json:"filename"`
	MaxSize    int    `mapstructure:"maxSize" json:"maxSize"`
	MaxAge     int    `mapstructure:"maxAge" json:"maxAge"`
	MaxBackups int    `mapstructure:"maxBackups" json:"maxBackups"`
}

// MySqlConfig mysql配置
type MySqlConfig struct {
	Host         string `mapstructure:"host" json:"host"`
	Port         string `mapstructure:"port" json:"port"`
	User         string `mapstructure:"user" json:"user"`
	Password     string `mapstructure:"password" json:"password"`
	Dbname       string `mapstructure:"dbname" json:"dbname"`
	Config       string `mapstructure:"config" json:"config"`
	MaxIdleConns int    `mapstructure:"maxIdleConns" json:"maxIdleConns"`
	MaxOpenConns int    `mapstructure:"maxOpenConns" json:"maxOpenConns"`
}

// RedisConfig redis配置
type RedisConfig struct {
	Host     string `mapstructure:"host" json:"host"`
	Port     int    `mapstructure:"port" json:"port"`
	Password string `mapstructure:"password" json:"password"`
	Db       int    `mapstructure:"db" json:"db"`
	PoolSize int    `mapstructure:"poolSize" json:"poolSize"`
}
