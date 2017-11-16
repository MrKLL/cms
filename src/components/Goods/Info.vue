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
        <!-- 飞舞的小球 -->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
        >
            <div class="ball" v-show="isShow"></div>
        </transition>

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
                        <div class="mui-numbox" data-numbox-min="1" >
                            <button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
                            <input class="mui-input-numbox" type="number"  @change="checkNum" ref="num" value="1">
                            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                        </div>
                    </div>
                    <div>
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger"  @click.prevent="addCart()">加入购物车</mt-button>
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
                    <mt-button plain type="danger" size="large" @click.prevent="goComment">商品评论</mt-button>
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
                count:1,
                //控制小球的展示和隐藏,默认隐藏
                isShow:false,
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
                this.$router.push(`/home/goodsdesc/${this.$route.params.id}`);
                //第二种写法 对象写法 name值和路由中的index.js中引入模板的name值相同
                //this.$router.push({name:'goodsdesc',params:{this.$route.params.id})
            },
            //使用编程式路由将页面导航到商品评论页面
            goComment(){
                //第一种写法 字符串写法
                this.$router.push(`/home/goodscomment/${this.$route.params.id}`);
                //第二种写法 对象写法 name值和路由中的index.js中引入模板的name值相同
                //this.$router.push({name:'goodsdesc',params:{this.$route.params.id})
            },
            //采用change事件监听用户填入的数量,保证其不超过库存数
            checkNum(){
                //如果用户输入的购买数量大于库存数
                //则将数目改为库存数
                if(this.$refs.num.value>this.info.stock_quantity){
                    this.$refs.num.value=this.info.stock_quantity;
                }
            },
            //用户点击加入购物车,触发此事件
            addCart(){
                //当用户点击加入购物车的时候展示一个飞入购物车的效果
                //1.小球显示
                this.isShow=true;
                //2.小球飞入购物车
                //  子组件通过父组件注册的方法给父组件传递参数
                //为了提高用户的体验度,这里延时0.6秒再将数据传给父组件,达到小球飞进购物车,数值再变化的效果
                setTimeout(()=>{
                    this.$emit('getCart',[this.$route.params.id,this.$refs.num.value]);
                },500);
            },

            // JS动画钩子函数
            beforeEnter: function (el) {
                // 设置小球的初始位置
                el.style.transform = 'translate(0, 0)';

                /*
                 如果我们写了以下代码，那么浏览器为了提高渲染DOM的性能，只会渲染一次
                 只会在 js 代码执行完成后，直接渲染：200px。而不是：第一次先渲染100px，然后再次渲染200px
                 el.style.top = '100px'
                 el.style.top = '200px'
                 */
            },
            // 此回调函数是可选项的设置
            // 与 CSS 结合时使用
            enter: function (el, done) {
                // 浏览器的重绘和重排，是影响前端web页面性能的一个重点
                // 作用：通知浏览器在这个点，重新渲染页面内容
                // el.offsetWidth
                // el.offsetHeight

                // ...
                // 通过 pageYOffset 来获取到页面滚动的距离
                // el.style.transform = 'translate(87px, 256px)'
                // 注意：window.pageYOffset 也是通知浏览器重新渲染页面了
                //设置小球的结束位置
                el.style.transform = 'translate(77px, ' + (window.pageYOffset + 229) + 'px)'
                //必须要这个done(),要不然下面的afterEnter不会执行
                done()
            },
            afterEnter: function (el) {
                // 小球飞入购物车,状态改为隐藏
                this.isShow = false
            }

        },
        created(){
            this.getGoodsInfo();
            this.getImgList();
        },
        mounted(){
            //mui中自己手动添加的值,需要手动初始化才能生效
            //此处初始化为了设置文本框默认值为1,且加减按钮还能生效
            this.$mui('.mui-numbox').numbox();
        }
    }
</script>

<style lang="scss" scoped>
    .goods-info {
        overflow: hidden;

     /*飞舞的小球*/
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
       transition: all 0.5s cubic-bezier(.3,-0.58,.83,.67);
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