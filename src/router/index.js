//1.导入vue组件
import Vue from 'vue'
//2.导入路由组件
import VueRouter from 'vue-router'
//3.使用路由插件
Vue.use(VueRouter);
//导入各大功能模板(首页,会员,购物车,搜索)
import Home from  '../components/Home/Home.vue'
import Vip from   '../components/Vip/Vip.vue'
import Cart from   '../components/Cart/Cart.vue'
import Search from '../components/Search/Search.vue'
//导入各大功能模块小的功能模块
//导入新闻列表模板
import NewsList from '../components/News/List.vue'
//导入新闻详情模板
import NewsInfo from '../components/News/Info.vue'
//导入图片分享模块
import PhotoList from '../components/Photo/List.vue'
//导入展示图片的列表模块
import PhotoInfo from '../components/Photo/Info.vue'
//导入商品购买列表模块
import GoodsList from '../components/Goods/List.vue'
//导入商品购买详情模块
import GoodsInfo from '../components/Goods/Info.vue'
//4.实例化路由组件
var router=new VueRouter
(
    {
        routes:
            [
                //重定向首页为home模块
                {path:'/',redirect:'/home'},
                //设置首页模块的路由
                {path:'/home',component:Home},
                //设置首页中的新闻模块的路由
                {path:'/home/newslist',component:NewsList},
                //设置新闻模块中的详情页面模块的路由
                {path:'/home/newsinfo/:id',component:NewsInfo},
                //设置图片分享模块的路由
                {path:'/home/photo',component:PhotoList},
                //设置展示图片的内容详情模块的路由
                {path:'/home/photo/:id',component:PhotoInfo},
                //设置展示商品列表模块的路由
                {path:'/home/goods',component:GoodsList},
                //设置展示商品详情模块的路由
                {path:'/home/goods/:id',component:GoodsInfo},
                {path:'/vip',component:Vip},
                {path:'/cart',component:Cart},
                {path:'/search',component:Search},
            ],
        // 默认情况下，路由的导航菜单，会自动给当前菜单添加 router-link-exact-active router-link-active 类，我们可以通过 linkActiveClass 来修改 router-link-active 这个类名
        linkActiveClass: 'mui-active'
    }
);
//5导出对象,以便可以再另外的js文件中使用
export default router