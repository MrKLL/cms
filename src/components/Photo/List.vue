<template>
    <div class="photo">
        <!-- 顶部分类 -->
        <div class="mui-slider">
            <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--
                      高亮样式处理:
                        只给 全部 菜单添加高亮效果(mui-active 类)
                      解决方案:
                        通过 :class 来动态给当前元素添加 mui-active 类
                        通过 'mui-active': item.id === 0 判断来只给全部菜单添加 这个类
                    -->
                    <a class="mui-control-item" :class="{'mui-active': item.id === 0}" href="#" v-for="item in cate" :key="cate.id" @click="getList(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 图片列表 -->
        <ul>
            <li class="img-item" v-for="data in list" :key="data.id" @click="getInfo(data.id)" >
                <!--v-lazy  结合mint UI实现图片懒加载-->
                <img  v-lazy="data.img_url">
                <div class="item-desc">
                    <h2>{{ data.title }}</h2>
                    <p>{{ data.zhaiyao }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    // 说明:
    // 在使用 mui.js 以后, 会让具有 mui-tab-item 类的元素的a标签改变hash值的功能失效
    //  简单来说：如果a标签具有 mui-tab-item 类，那么在引入 mui.js 后，不会再改变浏览器地址栏中的hash值
    // 解决问题：
    // 1 将 mui-tab-item 类替换掉，并且把原来的样式拿过来（不好）
    // 2 修改 mui.js / mui.min.js 的源码
    // 3 使用 编程式导航（通过js代码的方式，来替换 router-link 的功能）
    export default{
        data(){
            return {
                //存储图片分类信息
                cate:[],
                //存储图片列表信息
                list:[],
                //存储图片详情信息
                info:[]
            }
        },
        methods:{
            //实现获取图片分类列表展示功能
            getCate(){
                this.$http.get('/api/getimgcategory')
                    .then(res=>{
                        if(res.data.status===0)
                        {
                            //请求数据成功,接收数据
                            //因为返回数据中没有全部这个类别,所有需要手动添加一个全部分类进去
                            this.cate=res.data.message;
                            this.cate.unshift(
                                {
                                    id:0,
                                    title:'全部'
                                }
                            )
                        }
                    })
            },
            //实现图片列表展示功能(传递一个分类id过来)
            getList(id){
                var url=`/api/getimages/${id}`;
                console.log(url);
                this.$http.get(url)
                    .then(res=>{
                        if(res.data.status===0)
                        {
                            //请求数据成功,接收数据
                            this.list=res.data.message;
                            console.log(this.list);
                        }
                    })
            },
            //实现图片详情展示功能
            getInfo(id){
                //采用编程式导航进行跳转到另一个页面并携带此图片的id值
                this.$router.push(`/home/photo/${id}`);
            }

        },
        mounted(){
            //使用mui的顶部滚动标题导航栏需要添加以下代码
            //因为mui的js代码不符合babel-loader的严格模式解析js代码,所以需要将mui的js代码不让babel包来处理
            // 注意：因为初始化滚动的功能，需要操作DOM，所以，必须放到 mounted 钩子函数中才行
            //      因为只有 mounted 这个钩子函数调用的时候，页面中的DOM才可用
            this.$mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            //获取所有分类信息
            this.getCate();
            //获取所有图片内容,并用列表展示出来
            this.getList(0);
        }
    }

</script>

<style lang="scss" scoped>
    /* 去除掉 Chrome 浏览器中的滚动提示 */
    .mui-scroll {
        touch-action: none;
    }

    .mui-slider {
        position: fixed;
        background-color: #fff;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 5px;
        position: relative;
        margin-bottom: 50px;
        top: 38px;

    img {
        width: 100%;
        display: block;
    }

    .img-item {
        position: relative;
        margin-bottom: 5px;

    .item-desc {
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
        padding: 0 5px;

    h2 {
        color: #fff;
        font-size: 16px;
    }
    p {
        color: #fff;
    }
    }
    }
    }

    img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>