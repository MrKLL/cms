<template>
    <div class="newsInfo">
        <!-- 新闻头部 -->
        <header class="newsInfo-header">
            <h2 class="news-title">{{list.title}}</h2>
            <p class="mui-ellipsis">
                <span>发表时间：{{ list.add_time | date }}</span>
                <span>点击次数：{{ list.click }}次</span>
            </p>
        </header>

        <!-- 新闻内容区域 -->
        <!-- 注意：通过 v-html 指令动态生成的内容，不管页面中的内容，scope对其无效 -->
        <!--因为返回的内容里带有html标签,所以需要使用v-html来解析标签,直接使用{{list.content}}标签会不解析-->
        <div class="content" v-html="list.content"></div>

        <!--评论区域-->
        <!--因为需要获取当前组件里本条新闻的id值,再获取本条新闻的评论内容-->
        <!--所以此处涉及到父子间数据通讯问题(父传子)-->
        <Comment :commentId="list.id"></Comment>

    </div>
</template>

<script>
    //使用axios从接口获取数据
    //导入comment.vue组件
    import Comment from '../Comment/Comment.vue'
    //注册Comment组件
    export default{

        data(){
            return {
                //接收新闻内容数据
                list:''
            }
        },
        methods:{
          //获取新闻内容信息方法
            getNewsInfo(){
              //拼接地址
              var url='/api/getnew/'+this.$route.params.id;
              //发送请求
              this.$http.get(url)
                  .then(res=>{
                      if(res.data.status===0){
                          //数据获取成功,保存数据
                          this.list=res.data.message[0];
                      }else{
                          //数据获取失败,返回false
                          return false;
                      }
                  })
          }

        },
        created(){
            this.getNewsInfo();
        },
        //将Comment组件,注册为当前组件的子组件,以便可以在此组件中使用
        components:{
            Comment
        }

    }
</script>

<style lang="scss">
    .newsInfo
    {
        .newsInfo-header{
            padding:5px 2px;
            .news-title{
                font-size: 18px;
            }
            .mui-ellipsis{
                font-size: 14px;
                color: #26a2ff;
                margin:0;
                display: flex;
                /*flex布局：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html*/
                justify-content: space-between;
            }
        }

        .content{
            padding:10px 5px 0;
            border-top: 1px solid #ccc;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>