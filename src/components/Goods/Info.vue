<template>
    <div class="goods-info">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="(item,index) in imgList" :key="index">
                            <img  :src="item.src" />
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">
                {{ info.title }}
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="goods-price">
                        <span class="market-price">市场价：<del>￥{{ info.market_price }}</del></span>
                        <span>
              销售价：
              <span class="sell-price">￥{{ info.sell_price }}</span>
            </span>
                    </p>
                    <div class="numbox-container">
                        购买数量：
                        <div class="mui-numbox">
                            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                            <input class="mui-input-numbox" type="number"  v-model="count">
                            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                        </div>
                    </div>
                    <div>
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger" >加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ info.goods_no }}</p>
                    <p>库存情况：{{ info.stock_quantity }}件</p>
                    <p>上架时间：{{ info.add_time | date }}</p></div>
            </div>
            <div class="mui-card-footer">
                <p>
                    <mt-button plain type="primary" size="large" @click.prevent="goDesc">图文介绍</mt-button>
                </p>
                <p>
                    <mt-button plain type="danger" size="large">商品评论</mt-button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                //存储商品详情数据
                info:{},
                //存储商品图片,轮播图
                imgList:[],
                //存储当前商品数量
                count:0
            }
        },
        methods:{
            //获取商品购买栏里面的数据
            getGoodsInfo(){
                //设置请求数据的接口地址
                var url=`/api/goods/getinfo/${this.$route.params.id}`;
                //通过axios发送get请求,并接收返回数据
                this.$http.get(url)
                    .then(res=>{
                        if(res.data.status===0){
                            this.info=res.data.message[0];
                        }
                    })
            },
            //获取轮播图数据
            getImgList(){
                //设置请求数据的接口地址
                var url=`api/getthumimages/${this.$route.params.id}`;
                //通过axios发送get请求,并接收返回数据
                this.$http.get(url)
                    .then(res=>{
                        if(res.data.status===0){
                            this.imgList=res.data.message;
                        }
                    })
            },
            //使用编程式路由将页面导航到商品图文详情页面
            goDesc(){
                //第一种写法 字符串写法
//                console.log(this.$route.params.id);
                this.$router.push(`/home/goodsdesc/${this.$route.params.id}`);
                //第二种写法 对象写法 name值和路由中的index.js中引入模板的name值相同
                //this.$router.push({name:'goodsdesc',params:{this.$route.params.id})
            }

        },
        created(){
            this.getGoodsInfo();
            this.getImgList();
        }
    }
</script>

<style lang="scss" scoped>
    .goods-info {
        overflow: hidden;

    // 飞舞的小球
       .ball {
           width: 16px;
           height: 16px;
           background-color: #f00;
           border-radius: 50%;
           position: absolute;
           top: 364px;
           left: 150px;
           z-index: 11;

       // 动画效果
       // ease 表示：缓动动画
       // 1s 表示：动画执行时长
       transition: all 0.6s cubic-bezier(.3,-0.58,.83,.67);
       }

    .mint-swipe {
        height: 180px;
        text-align: center;

    img {
        height: 100%;
    }
    }

    .goods-price {
        color: #000;

    .sell-price{
        color: #f00;
        font-size: 16px;
        font-weight: bold;
    }
    }

    .numbox-container {
        margin-bottom: 10px;
    }

    .mint-button {
        font-size: 14px;
        height: 36px;
    }

    .mui-card-footer, .mui-card-header {
        display: block;
    }
    }
</style>