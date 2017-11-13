<template>
    <div class="home">
        <!--使用了MintUI中的swipe组件(轮播图)-->
        <mt-swipe :auto="3000" >
            <mt-swipe-item v-for="(data,index) in list" :key="index">
                <img :src="data.img">
            </mt-swipe-item>
        </mt-swipe>
        <!--使用MUI中的九宫格模板-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newslist">
                        <span class="mui-icon news"></span>
                        <div class="mui-media-body">新闻资询</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photo">
                    <span class="mui-icon photo"></span>
                    <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/goods">
                    <span class="mui-icon cart"></span>
                    <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <span class="mui-icon feedback"></span>
                    <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <span class="mui-icon video"></span>
                    <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <span class="mui-icon phone"></span>
                    <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default
{
    //通过axios向接口发送请求,获取数据
    //在钩子函数created中使用,在页面加载的时候就自动请求数据
    created()
    {
        //this就是Vue实例,因为axios挂载在Vue实例的原型上,所以这里可以这么使用
        this.$http.get('api/getlunbo')
            .then (res => {
                //这里采用es6的箭头函数的写法
                if(res.data.status === 0){
                    //数据获取成功
                    //将数据保存在this.list中
                    this.list=res.data.message;
                }else{
                    //获取数据失败,返回false
                    return false;
                }
            })
    },
    data(){
        return {
            //用来接收请求返回的数据
            list:''
        }
    }

}
</script>

<style lang="scss">
    .home
    {
    .mint-swipe
        {
            background: skyblue;
            height:200px;
            img
                {
                    height:100%;
                    width:100%
                }
        }
    .mui-icon
    {
        /*设置每个九宫格展示图标区域的宽高*/
        height: 60px;
        width: 60px;
        background-size: cover;
    }
    /*设置每个九宫格的图标*/
    .news
    {
        background-image: url("../../images/menu1.png");
    }
    .photo
    {
        background-image: url("../../images/menu2.png");
    }
    .cart
    {
        background-image: url("../../images/menu3.png");
    }
    .feedback
    {
        background-image: url("../../images/menu4.png");
    }
    .video
    {
        background-image: url("../../images/menu5.png");
    }
    .phone
    {
        background-image: url("../../images/menu6.png");
    }
    .mui-content>.mui-table-view:first-child
        {
            /*让整个九宫格紧挨轮播图*/
            margin:0;
        }
        .mui-grid-view.mui-grid-9
        {
            /*设置九宫格导航栏的背景色为白色*/
            background:#fff;
            .mui-table-view-cell
            {
                /*去掉九宫格之间的边框*/
                border:0;
            }
        }

    }
</style>