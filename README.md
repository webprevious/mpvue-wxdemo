# mplearn2

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 分页介绍原理
如果有35条数据 每次加载10条 

mysql中有一个limit字段可以规定分页
    第一页  0-10
    第二页  10-20
    第三页  30-40（只有5条了）
    page    有多个数据

数据加载完毕，没有更多数据
    1.page = 0时，当数据库为空时，就不能显示这条提醒
    2.page > 0时，数据长度<10 停止触底刷新

当加载到某一页时数据不够10个说明没有更多数据了，那么底部就要展示没有更多数据了

本地项目部署步骤：

1.使用git clone将项目copy至本地

2.此项目是前后端分离项目，进入客户端项目mplearn2安装依赖npm install完成后npm run dev

3.进入mplearn2中server目录，server就是后端，使用node搭建，主要技术是koa，也是第一步安装依赖npm install完成后npm run dev

4.本地还需要有一个mysql服务器，启动mysql，将mplearn2目录中的sql文件夹下的table.sql导入mysql，如果导入出错可以使用编辑器打开table.sql进行查看

5.配置mplearn2中server目录中config.js开启本地测试相关配置，并将config.js下mysql连接信息密码和用户修改为你本地mysql的用户和密码

6.配置客户端项目mplearn2中的config.js开启本地项目服务器地址

7.本地还需要一个微信开发工具这个软件用于预览小程序

8.最好再一次重启两个项目npm run dev



本项目技术选型：
    1.使用mpvue框架开发微信小程序
    2.本项目是前后端分离的项目，前端使用有微信小程序自带组件和api
    3.使用简单的后台，技术选型是node以及基于node的koa2和koa-router，数据库操作使用knex
