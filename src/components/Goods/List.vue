<template>
    <div class="goods-list">
        <ul>
            <li class="goods-item" v-for="item in list" :key="item.id" @click="goInfo(item.id)">
                <img  v-lazy="item.img_url">
                <h2>{{ item.title }}</h2>
                <div>
                    <span class="price-cur">￥{{ item.sell_price }}</span>
                    <span class="price-prev">￥{{ item.market_price }}</span>
                </div>
                <p>
                    <span>热卖中</span>
                    <span>剩余{{ item.stock_quantity }}件</span>
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
                //存储图片列表数据信息
                list:[],
                //存储页码
                page:1,
                //控制加载更多按钮显示还是隐藏,默认显示
                isShow:true
            }
        },
        methods:{
           //获取指定页码的商品数据
            getGoodsList(){
                //设置请求数据的接口地址
                var url=`/api/getgoods?pageindex=${this.page}`;
                //通过axios发送get请求,并接收返回数据
                this.$http.get(url)
                    .then(res=>{
                        //默认一次获取的数据为10条,一次获取的数据小于10说明没有数据了,隐藏加载更多按钮
                        if(res.data.message.length<10){
                            this.isShow=false
                        }
                        console.log(res);
                        if(res.data.status===0){
                            //获取数据成功,将数据保存,以便在模板中展示数据
                            //将后面获取的数据与之前的数据进行合并,不会出现覆盖之前的数据的情况
                            this.list=this.list.concat(res.data.message);
                        }
                    })

            },
            //实现加载更多功能
            getMore(){
                //页码加1,获取下一页内容
                this.page+=1;
                this.getGoodsList();
            },
            //使用编程式导航的方式跳转到详情页面
            goInfo(id){
                this.$router.push(`/home/goods/${id}`);
            }
        },
        created(){
            //页面打开的时候,直接获取全部数据
            this.getGoodsList();
        }
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