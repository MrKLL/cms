# Vue 项目

## 技术

```html
vue + axios + vue-router
UI库和组件库：MintUI + MUI
webpack + ES6
```

## 项目依赖

```html
---- 开发依赖 ----
npm i -D webpack webpack-dev-server html-webpack-plugin style-loader css-loader sass-loader node-sass url-loader file-loader babel-core babel-loader babel-plugin-transform-runtime babel-preset-es2015 babel-preset-stage-0 vue-loader vue-template-compiler

组件按需加载插件
npm install babel-plugin-component -D

---- 项目依赖 ----
npm i -S babel-runtime
npm i -S vue vue-router axios mint-ui
```

## 项目功能

- 1 App组件（项目入口）搭建
  - header（mint-ui）
  - footer（注意MUI样式覆盖的问题 - tabbar）
  - content（路由的使用，别忘了use注册路由）
- 2 首页
  - 轮播图（mint-ui Swipe）
  - 九宫格（grid-default）
- 3 新闻咨询
  - 新闻列表（media-list）
  - 新闻详情
  - 评论
- 4 图片分享
  - 图片列表（tab-top-webview-main） http://dev.dcloud.net.cn/mui/ui/#scroll
  - 图片详情（mint-ui lazy-load）
  - 图片详情预览（npm i -S vue-preview）
- 5 商品购买
  - 商品列表
  - 商品详情（card、numbox）
- 6 购物车
  - 每个商品（card）
  - 开关（mint-ui switch）
  - 购物车商品总数 和 总价
  - 商品删除

```html
// 有利于开发期间定位错误信息
devtool: '#eval-source-map',
```

```css
/* 文字内容超过长度以后省略号显示 */
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

```css
/* scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667 */
* {
  touch-action: none;
}
```

```js
// vue-router 编程式导航：
// https://router.vuejs.org/zh-cn/essentials/navigation.html
showInfo(id) {
  this.$router.push('/home/photoinfo/' + id)
}
```

## bug

- 警告: Avoid using non-primitive value as key, use string/number value instead
  - 说明: 如果v-for中的key有重复值, 会提示这个信息
  - 解决: 使用不同的key

## 资源

- [C3 - 贝塞尔动画演示](http://cubic-bezier.com/)

## Vue项目的创建过程

### 基本结构的描述

- `./src/index.html` 就是整个项目的页面，因为我们通过Vue做了一个SPA（单页面应用程序），因此整个页面中只有这一个页面。这个页面中，只需要提供一个 div 就可以了，其他所有的内容，都通过组件或main.js中的代码来提供
- `./src/js/main.js` 这是整个项目的入口js文件
- `./src/App.vue` 是整个页面的入口组件，也就是项目启动就要渲染的组件，是整个项目页面的入口
