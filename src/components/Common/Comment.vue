<template>
    <div class="comment">
        <h2 class="comment-header">发表评论</h2>
        <!-- maxlength控制文本域中输入内容的长度 -->
        <textarea cols="30" rows="5" placeholder="请输入评论内容，最多输入120字" maxlength="120"  v-model="content"></textarea>
        <mt-button type="primary" size="large" @click="sendMonment">发表评论</mt-button>
        <ul class="comment-content">
            <li class="comment-item"  v-for="(item,index) in list" :key="index">
                <h3>
                    <span>第{{ index+1 }}楼</span>
                    <span>用户：{{item.user_name}}</span>
                    <span>发表时间：{{ item.add_time | date }}</span>
                </h3>
                <p>{{ item.content }}</p>
            </li>
        </ul>

        <!-- plain 幽灵按钮（空心，只有边框） -->
        <mt-button type="primary" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    // 导入 mint-ui 的提示组件
    import { Toast } from 'mint-ui'
    export default{
        data(){
            return {
                //存储评论数据
                list:[],
                //存储页码
                page:1,
                //存储用户输入的评论内容
                content:''
            }
        },
        //接收父组件中传递过来的id值
        props:['commentId'],
        methods:{
            //获取指定页码的评论数据
            getComment(){
                //设置请求接口参数
                //采用es6字符串模板方式来编写
                var url=`api/getcomments/${this.$route.params.id}?pageindex=${this.page}`;
                this.$http.get(url)
                    .then(res=>{
                        if(res.data.status===0){
                            this.list=this.list.concat(res.data.message);
                        }
                    })
            },
            //实现获取更多评论功能
            getMore(){
                this.page=this.page+1;
                this.getComment();
            },
            //实现发送评论功能
            sendMonment(){
                //如果用户发送空内容或者空字符串,提醒用户输入内容
                if(this.content.trim()===''){
                    Toast({
                        message: '请输入评论内容',
                        duration: 1000
                    });
                    return;
                }
                //用户评论内容不为空,将内容上传至服务器
                var url = `api/postcomment/${this.commentId}`;
                this.$http.post(url,`content=${this.content}`)
                    .then(res=>{
                        if(res.data.status===0){
                            //评论提交成功,提示评论成功
                            Toast({
                                message: '评论成功',
                                duration: 1000
                            });
                            //将评论内容插入到数据第一条并显示
                            this.list.unshift(
                                {
                                    add_time: new Date(),
                                    content: this.content,
                                    user_name: "老范"
                                });
                            //清空评论框的内容
                                this.content='';
                        }
                    })
            }
        },
        created(){
            this.getComment(this.commentId);
        }
    }
</script>

<style lang="scss">
    .comment {
        border-top: 1px solid #ddd;
        padding: 10px;

    .comment-header {
        font-size: 22px;
    }

    .comment-content {
        list-style: none;
        margin: 0;
        padding: 0;

    .comment-item {

    h3 {
        font-weight: 500;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        background-color: #ddd;
        height: 26px;
        line-height: 26px;
    }

    p {
        padding-left: 10px;
        color: #000;
    }

    }
    }
    }

</style>