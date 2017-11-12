<template>
    <!--这里使用了 mui 的列表库-->
    <div class="news">
        <ul class="mui-table-view mui-table-view-chevron ">
            <li class="mui-table-view-cell mui-media" v-for="data in list" :key="data.id">
                <router-link class="mui-navigate-right" :to="'/home/newsinfo/'+data.id">
                    <img class="mui-media-object mui-pull-left" :src="data.img_url">
                    <div class="mui-media-body">
                        <h3 class="news-title">{{ data.title }}</h3>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{ data.add_time | date }}</span>
                            <span>点击次数：{{ data.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                //接收请求返回的数据
                list:''
            }
        },
        methods:{
            //获取所有的数据信息
            getNewsList(){
                this.$http.get('api/getnewslist')
                    .then(res=>{
                        if(res.data.status === 0){
                            //获取数据成功,将数据保存,以便在模板中使用
                            this.list=res.data.message;
                        }else{
                            //获取数据失败
                            return false;
                        }
                    })
            }
        },
        //在钩子函数created中调用此方法,做数据的初始化展示
        created(){
            this.getNewsList();
        }

    }
</script>

<style lang="scss">
    .news
    {
        /*新闻列表标题,多余标题显示...*/
        .news-title {
            font-size: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 500;
        }
        /*处理时间和点击次数的样式*/
        .mui-ellipsis{
            font-size: 12px;
            color: #26a2ff;
            display: flex;
        // flex布局：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
            justify-content: space-between;
        }
        .mui-table-view-chevron{
            .mui-table-view-cell{
                padding-right: 54px;
            }
        }
    }
</style>