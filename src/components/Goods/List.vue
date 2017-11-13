<template>
    <div class="goods-list">
        <ul>
            <li class="goods-item">
                <img alt="">
                <h2>标题</h2>
                <div>
                    <span class="price-cur">￥折后价</span>
                    <span class="price-prev">￥原价</span>
                </div>
                <p>
                    <span>热卖中</span>
                    <span>剩余1件</span>
                </p>
            </li>
        </ul>

        <!-- 加载更多 -->
        <mt-button plain size="large" type="primary" @click="getMore" v-show="isShow">加载更多</mt-button>
    </div>
</template>

<script>
    export default{
        data(){
            return {

            }
        },
        methods:{},
        created(){}
    }
</script>

<style lang="scss" scoped>
    .goods-list {
    /*商品列表*/
       ul {
           list-style: none;
           margin: 0;
           padding: 0;
           display: flex;
        /*flex布局：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html*/
        /*默认情况下，项目都排在一条线（又称"轴线"）上。*/
        /*flex-wrap属性定义，如果一条轴线排不下，如何换行。*/
       flex-wrap: wrap;
       }

    /*商品项*/
       .goods-item {
           width: 48%;
           margin: 1%;
           padding: 3px;
           border: 1px solid #ccc;
        /*盒子阴影*/
        /*http://www.w3school.com.cn/cssref/pr_box-shadow.asp*/
        /*box-shadow: h-shadow v-shadow blur color;*/
        /*h-shadow：水平阴影的位置*/
        /*v-shadow: 垂直阴影的位置*/
        /*blur：模糊的级别*/
        /*color: 阴影的颜色*/
       box-shadow: 0 0 10px #ccc;

    /*商品标题*/
       h2 {
           font-size: 14px;
       }

    /*// 商品价格*/
       div {
           font-size: 14px;
           margin-top: 5px;

    /*// 商品当前价格*/
       .price-cur {
           color: #f00;
           margin-right: 10px;
       }
    /*// 商品原价*/
       .price-prev {
           text-decoration: line-through;
           color: #ccc;
       }
    }

    /*// 商品图片*/
       img {
           width: 100%;
       }

    /*// 热卖 和 库存数量*/
       p {
           margin: 0;
           padding: 0 3px;
           color: #ccc;
           display: flex;
           justify-content: space-between;
       }
    }
    }
</style>