//**********************导入模块开始***********************
// 导入 vue
import Vue from 'vue'
//导入mintUI中要用到的组件(按需导入)
import {Header, Button, Swipe, SwipeItem} from 'mint-ui'
//导入MUI样式文件
import '../lib/mui/css/mui.min.css'
//导入MUI字体文件
import '../lib/mui/fonts/mui-icons-extra.ttf'
// 导入 app 组件
import App from '../App.vue'
//导入自定义样式文件
import '../css/index.css'
//导入路由模块(注意:index.js可不写,后缀名js可不写)
import router from '../router'
//导入过滤器
import '../filters/date'
//导入axios组件
import axios from 'axios'
//设置axios请求接口的公共部分
axios.defaults.baseURL='http://vue.studyit.io';
//**********************导入模块结束***********************

//**********************注册或使用组件模块开始***********************
// 为了在其他的组件或库中能够使用该axios，我们要将axios对象添加为vue原型的属性中
// 注意：对于非Vue插件，都采用给原型对象添加属性的方式来使用，在组件中使用的时候，直接通过 this就可以访问了
//对于vue插件在导入之后,可以采取Vue.use()来注册组件,例如router
Vue.prototype.$http=axios;
//注册MintUI中导入的组件(查看官网使用文档)
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 使用vue,创建vue实例
new Vue({
  // 通过 el 指定挂载到页面中的位置
  el: '#app',
  // 通过 render 函数来渲染首页组件
  //箭头函数写法
  render: c => c(App),
  //传统写法
  /* render: function (create) {
    return create(App)
  } */

  //将路由与vue实例连接起来,全写为router:router
  //当属性名与属性值相同的时候可以只写一个
    router
});
