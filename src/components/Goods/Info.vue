<template>
    <div class="goods-info">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item>
                            <img :src="" />
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">
                华为（HUAWEI）荣耀6Plus 16G双4G版
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="goods-price">
                        <span class="market-price">市场价：<del>￥2499</del></span>
                        <span>
              销售价：
              <span class="sell-price">￥2195</span>
            </span>
                    </p>
                    <div class="numbox-container">
                        购买数量：
                        <div class="mui-numbox">
                            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                            <input class="mui-input-numbox" type="number">
                            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                        </div>
                    </div>
                    <div>
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：SD9102356032</p>
                    <p>库存情况：60件</p>
                    <p>上架时间：2015-04-20 00:51:03</p></div>
            </div>
            <div class="mui-card-footer">
                <p>
                    <mt-button plain type="primary" size="large">图文介绍</mt-button>
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
                info:[]
            }
        },
        methods:{
            getGoodsInfo(){
                //设置请求数据的接口地址
                var url=`/api/goods/getdesc/${this.$route.params.id}`;
                //通过axios发送get请求,并接收返回数据
                this.$http.get(url)
                    .then(res=>{
                        if(res.data.status===0){
                            this.list=res.data.message[0];
                            console.log(this.list);
                        }
                    })
            }
        },
        created(){
            this.getGoodsInfo();
        }
    }
</script>

<style lang="scss" scoped>
    .goods-info {
        overflow: hidden;

    .mint-swipe {
        height: 180px;
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

    .mui-numbox {
        height: 22px;
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