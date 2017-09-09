# Website

[个人网站](http://www.wuhongjiang.com/home)　

~~[建站教程](http://www.wuhongjiang.com/book/build_a_website_guide/)~~

## 技术栈:

* 前端: Vue.js + Webpack

* 后端: Node.js (Express) 

* 数据库: MongoDB

* 进程管理: PM2

## 目录介绍

* docs —— 开发文档

* FrontEnd —— 前端代码

* Server ——　后端代码

* store ——　资源仓库

## 开始

1. 安装与开启MongoDB数据库

版本: 3.4.4

[MongoDB下载地址](https://www.mongodb.com/download-center?jmp=nav#community)

数据库默认端口：27017

2. 下载node_modules

``` shell
 cd Server
 npm install
```

3. 运行

``` shell
npm start 
```
默认端口:　3000

## 配置文件

1. 服务器配置文件 

``` javascript
// Server/config.js 

module.exports = {
  admin: {
    username: '123', // 用户名
    password: '123',　// 密码
    md5: false　// 密码md5加密
  },
  cookieSecret: 'some key', // cook加密
  filterIP: ['192.168.8.119'] // 过滤IP不增加访问量
};
```

2. 前端主界面配置文件

``` javascript
// FrontEnd/home/config_person.js

const personConfig = {
  title: '网站',
  name: '你的名字',
  email: 'wu38607@live.com',
  git: 'https://github.com/wu38607',
  head: '/static/img/head.jpg'
}

export { personConfig };
```

## [MIT Licensed](LICENSE)
